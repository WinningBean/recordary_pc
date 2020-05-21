package com.fairy_pitt.recordary.endpoint.main;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.AnonymousAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import io.findify.s3mock.S3Mock;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class S3UploadComponentTest {

    private S3UploadComponent s3UploadComponent;
    private AmazonS3 mockS3Client;
    private S3Mock s3Mock;
    private String bucket;

    private MockMultipartFile mockMultipartFile;
    private String fileName = "savedFileName";
    private String serviceEndpoint = "http://localhost:8001";

    @BeforeEach
    void setUp() {
        bucket = "test-bucket";
        mockMultipartFile = new MockMultipartFile("file", "mock1.png", "image/png", "test data".getBytes());

        s3Mock = new S3Mock.Builder().withPort(8001).withInMemoryBackend().build();
        s3Mock.start();

        AwsClientBuilder.EndpointConfiguration endpoint = new AwsClientBuilder.EndpointConfiguration(serviceEndpoint, "ap-northeast-2");
        mockS3Client = AmazonS3ClientBuilder
                .standard()
                .withPathStyleAccessEnabled(true)
                .withEndpointConfiguration(endpoint)
                .withCredentials(new AWSStaticCredentialsProvider(new AnonymousAWSCredentials()))
                .build();
        mockS3Client.createBucket(bucket);

        s3UploadComponent = new S3UploadComponent(mockS3Client, bucket);
    }

    @AfterEach
    void tearDown() {
        s3Mock.shutdown();
    }

    @Test
    void S3_파일_업로드() throws IOException {
        // given
        String expectedUrl = String.format("%s/%s/%s", serviceEndpoint, bucket, fileName);

        // when
        String actualUrl = s3UploadComponent.upload(mockMultipartFile, fileName);

        // then
        assertThat(actualUrl).isEqualTo(expectedUrl);
    }

    @Test
    void S3_파일_삭제() throws IOException {
        //given
        s3UploadComponent.upload(mockMultipartFile, fileName);
        assertDoesNotThrow(() -> mockS3Client.getObject(bucket, fileName));

        //when
        s3UploadComponent.delete(fileName);

        //then
        assertThrows(AmazonS3Exception.class, () -> mockS3Client.getObject(bucket, fileName));
    }

    @Test
    void S3_폴더_생성(){
        //given
        String folderName = "testFolder";
        String expectedUrl = String.format("%s/%s/%s", serviceEndpoint, bucket, folderName);

        //when
        s3UploadComponent.createFolder(folderName);

        //then
        assertThat(mockS3Client.getUrl(bucket, folderName).toString()).isEqualTo(expectedUrl);
    }

    @Test
    void S3_폴더_리스트_불러오기() throws IOException{
        //given
        String folderName = "testFolder";
        s3UploadComponent.createFolder(folderName);
        String expectedUrl1 = s3UploadComponent.upload(mockMultipartFile, folderName + "/" + fileName + 1);
        String expectedUrl2 = s3UploadComponent.upload(mockMultipartFile, folderName + "/" + fileName + 2);

        //when
        List<String> actualUrlList = s3UploadComponent.listObject(folderName);

        //then
        assertThat(actualUrlList.get(0)).isEqualTo(expectedUrl1);
        assertThat(actualUrlList.get(1)).isEqualTo(expectedUrl2);
    }
}
