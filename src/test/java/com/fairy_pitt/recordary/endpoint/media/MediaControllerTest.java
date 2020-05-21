package com.fairy_pitt.recordary.endpoint.media;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.AnonymousAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.fairy_pitt.recordary.common.entity.MediaEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.MediaRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.main.S3UploadComponent;
import io.findify.s3mock.S3Mock;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.IOException;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MediaControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private UserRepository userRepository;

    private S3UploadComponent s3UploadComponent;
    private AmazonS3 mockS3Client;
    private S3Mock s3Mock;
    private String bucket;

    private String fileName = "savedFileName";
    private String serviceEndpoint = "http://localhost:8001";

    @BeforeEach
    void setUp() {
        bucket = "test-bucket";
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
        mediaRepository.deleteAll();
        userRepository.deleteAll();
        s3Mock.shutdown();
    }

    @Test
    public void Media_등록된다(){
        //given
        UserEntity userEntity = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        MockMultipartFile mockMultipartFile1 = new MockMultipartFile("mediaFiles", "mock1.png",
                "image/jpeg", "test data".getBytes());
        MockMultipartFile mockMultipartFile2 = new MockMultipartFile("mediaFiles", "mock2.png",
                "image/jpeg", "test data".getBytes());

        String url = "http://localhost:" + port + "/media/" + userEntity.getUserCd();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
//        map.add("mediaFiles", mockMultipartFile1);
//        map.add("mediaFiles", mockMultipartFile2);

        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(map, headers);

        //when
//        ResponseEntity<Long> responseEntity = restTemplate.exchange(
//                url,
//                HttpMethod.POST,
//                entity,
//                Long.class);

//        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
//        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<String, Object>();
//        multiValueMap.add("mediaFiles", mockMultipartFile1);
//        multiValueMap.add("mediaFiles", mockMultipartFile2);
//
//        Long result = restTemplate.postForObject(url, multiValueMap, Long.class);

        //then
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//
//        List<MediaEntity> all = mediaRepository.findAll();
//        assertThat(all.get(0).getMediaCd()).isEqualTo(responseEntity.getBody());
    }

    @Test
    public void Media_리스트_불러오기() throws IOException {
        //given
        String folderName1 = "testFolder";
        String folderName2 = "testFolder/test";
        MockMultipartFile mockMultipartFile1 = new MockMultipartFile("file", "mock1.png", "image/png", "test data".getBytes());
        MockMultipartFile mockMultipartFile2 = new MockMultipartFile("file", "mock2.png", "image/png", "test data".getBytes());

        s3UploadComponent.createFolder(folderName1);
        s3UploadComponent.createFolder(folderName2);
        String expectedUrl1 = s3UploadComponent.upload(mockMultipartFile1, folderName2 + "/" + fileName + 1);
        String expectedUrl2 = s3UploadComponent.upload(mockMultipartFile2, folderName2 + "/" + fileName + 2);

        MediaEntity mediaEntity = mediaRepository.save(MediaEntity.builder()
                .mediaPath(folderName2)
                .build());

        String url = "http://localhost:" + 8001 + "/media/ " + mediaEntity.getMediaCd();

        List<String> actualUrlList = s3UploadComponent.listObject(mediaEntity.getMediaPath());

        //when
//        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(responseEntity.getBody()).isEqualTo(2);
    }
}
