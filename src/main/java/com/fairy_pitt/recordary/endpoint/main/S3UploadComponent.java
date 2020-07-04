package com.fairy_pitt.recordary.endpoint.main;

import com.amazonaws.AmazonClientException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3UploadComponent {

    private AmazonS3 amazonS3Client = AmazonS3ClientBuilder.standard()
            .withRegion(Regions.AP_NORTHEAST_2)
            .build();

    @Value("${cloud.aws.s3.bucket}") //해당 값은 application.yml 에서 작성한 cloud.aws.credentials.accessKey 값을 가져옵니다.
    private String bucket;

    public S3UploadComponent(final AmazonS3 amazonS3Client, final String bucket) {
        this.amazonS3Client = amazonS3Client;
        this.bucket = bucket;
    }

    public void createFolder(String folderName) {
        amazonS3Client.putObject(bucket, folderName + "/", new ByteArrayInputStream(new byte[0]), new ObjectMetadata());
    }

    public String mediaEntityUpload(MultipartFile[] multipartFiles, Long id, String[] extension) throws IOException {
        String dirName = "media/" + id + "_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        int fileNum = 1;
        createFolder(dirName);
        for (MultipartFile multipartFile : multipartFiles) {
            String fileName = dirName + "/" + fileNum + "." + extension[fileNum - 1];
            upload(multipartFile, fileName);
            fileNum++;
        }
        return dirName;
    }

    public String profileUpload(MultipartFile multipartFile, String dirName, Long id) throws IOException {//MultipartFile 을 전달 받고
        File uploadFile = multipartToFile(multipartFile)//S3에 전달할 수 있도록 MultiPartFile 을 File 로 전환
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        //S3에 MultipartFile 타입은 전송이 안됨

        String contentType = multipartFile.getContentType().split("/")[1];
        String fileName = dirName + "/" + id + "." + contentType;
        upload(uploadFile, fileName);
        return fileName;
    }

    public String upload(MultipartFile multipartFile, String fileName) throws IOException {//MultipartFile 을 전달 받고
        File uploadFile = multipartToFile(multipartFile)//S3에 전달할 수 있도록 MultiPartFile 을 File 로 전환
               .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        //S3에 MultipartFile 타입은 전송이 안됨

        return upload(uploadFile, fileName);
        //업로드된 파일의 S3 URL 주소를 반환
    }

    private String upload(File uploadFile, String fileName) {
        String uploadImageUrl = putS3(uploadFile, fileName); // 전환된 File 을 S3에 public 읽기 권한으로 put
        //->외부에서 정적 파일을 읽을 수 있도록 하기 위함.
        removeNewFile(uploadFile);
        //  MultipartFile -> File 로 전환되면서 로컬에 파일 생성된것을 삭제함
        return uploadImageUrl;
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile) //로드를 하기 위해 사용되는 함수입니다
                .withCannedAcl(CannedAccessControlList.PublicRead)); //외부에 공개할 이미지이므로, 해당 파일에 public read 권한을 추가
        return amazonS3Client.getUrl(bucket, fileName).toString(); //업로드를 한 후, 해당 URL을 DB에 저장할 수 있도록 컨트롤러로 URL 을 반환
    }

    public List<String> listObject(String preFix)
    {
        List<String> resultList = new ArrayList<>();
        ObjectListing objectListing = amazonS3Client.listObjects(bucket, preFix);
        int folderCount = 0;
        for (S3ObjectSummary os : objectListing.getObjectSummaries()){
            String objectKey = os.getKey();
            if (!objectKey.endsWith("/")) resultList.add(amazonS3Client.getUrl(bucket, objectKey).toString());
        }
        return resultList;
    }

    public String getUrl(String objectName) throws AmazonClientException{
        return amazonS3Client.getUrl(bucket, objectName).toString();
    }

    private Boolean isValidObject(String objectName) throws AmazonClientException{
        try {
            amazonS3Client.getObjectMetadata(bucket, objectName);
        } catch (AmazonS3Exception s3e){
            if (s3e.getStatusCode() == 404) return false;
            else throw s3e;
        }
        return true;
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("임시파일이 삭제되었습니다");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    // 파일 삭제
    public void delete(String objectName) {
        amazonS3Client.deleteObject(bucket, objectName);
    }

    public void profileDelete(String dirName, String fileName) throws AmazonClientException {
        String objectName = dirName + "/" + fileName;
        if (isValidObject(objectName)) delete(objectName);
    }

    public void mediaDelete(String preFix){
        ObjectListing objectListing = amazonS3Client.listObjects(bucket, preFix);
        for (S3ObjectSummary os : objectListing.getObjectSummaries()){
            delete(os.getKey());
        }
        delete(preFix);
    }

    private Optional<File> convert(MultipartFile file) throws IOException { //MultiPartFile 을 File 로 전환
        File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
                fos.close();
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    public Optional<File> multipartToFile(MultipartFile multipart) throws IllegalStateException, IOException
    {
        File convertFile = new File(Objects.requireNonNull(multipart.getOriginalFilename()));
        if(convertFile.createNewFile()) {
            multipart.transferTo(convertFile);
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}