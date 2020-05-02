package com.fairy_pitt.recordary.endpoint.main;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3UploadComponent {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}") //해당 값은 application.yml 에서 작성한 cloud.aws.credentials.accessKey 값을 가져옵니다.
    private String bucket;

    public List<String> postUpload(MultipartFile[] multipartFiles, Long userCd) throws IOException {
        List<String> uploadImageUrl = new ArrayList<>();
        String dirName = userCd + "_" + System.currentTimeMillis(); // 유저코드 + 현재시간 으로 폴더 만듬
        for (MultipartFile multipartFile : multipartFiles) {
            File uploadFile = convert(multipartFile)//S3에 전달할 수 있도록 MultiPartFile 을 File 로 전환
                    .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
            uploadImageUrl.add(upload(uploadFile, dirName));
        }
        return uploadImageUrl;
    }

    public String upload(MultipartFile multipartFile, String dirName) throws IOException {//MultipartFile 을 전달 받고
        File uploadFile = convert(multipartFile)//S3에 전달할 수 있도록 MultiPartFile 을 File 로 전환
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        //S3에 MultipartFile 타입은 전송이 안됨

        return upload(uploadFile, dirName);
        //업로드된 파일의 S3 URL 주소를 반환
    }

    private String upload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + uploadFile.getName();
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

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    // 파일 삭제
    public void fileDelete(String fileName) {
        String imgName = (fileName).replace(File.separatorChar, '/');
        amazonS3Client.deleteObject(bucket, imgName);
    }

//    public String update(String currentFilePath, MultipartFile multipartFile) throws IOException {
//        // 고유한 key 값을 갖기위해 현재 시간을 postfix 로 붙여줌
//        SimpleDateFormat date = new SimpleDateFormat("yyyymmddHHmmss");
//        String fileName = multipartFile.getOriginalFilename() + "-" + date.format(new Date());
//
//        // key 가 존재하면 기존 파일은 삭제
//        if ("".equals(currentFilePath) == false && currentFilePath != null) {
//            boolean isExistObject = amazonS3Client.doesObjectExist(bucket, currentFilePath); //버킷에 해당 key 를 가진 객체가 존재하는지 확dls
//
//            if (isExistObject == true) {
//                amazonS3Client.deleteObject(bucket, currentFilePath);
//            }
//        }
//        // 파일 업로드
//         upload(uploadFile, dirName);

        //fileName
//    }

    private Optional<File> convert(MultipartFile file) throws IOException { //MultiPartFile 을 File 로 전환
        File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    public List<String> listObject(String bucketName)
    {
        List<String> resultList = new ArrayList<>();
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucketName);
        listObjectsRequest.setPrefix("static");

        ObjectListing  result = amazonS3Client.listObjects(listObjectsRequest);
        List<S3ObjectSummary> objects = result.getObjectSummaries();
        for (S3ObjectSummary os : objects) {
            resultList.add( os.getKey());
        }
        return  resultList;
    }
}
