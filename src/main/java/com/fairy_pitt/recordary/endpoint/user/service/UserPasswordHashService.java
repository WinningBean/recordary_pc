package com.fairy_pitt.recordary.endpoint.user.service;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;

@Service
public class UserPasswordHashService {
    public String getSHA256(String plainText){
        String shaString = "";
        try{
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(plainText.getBytes());
            byte byteData[] = sh.digest();
            StringBuffer stringBuffer = new StringBuffer();

            int byteSize = byteData.length;
            for (int i = 0; i < byteSize; i++){
                stringBuffer.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }
            shaString = stringBuffer.toString();
        }
        catch (Exception e){
            e.printStackTrace();
            shaString = null;
        }
        return shaString;
    }
}
