package com.fairy_pitt.recordary.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class WebSocketHandler {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private Map<Long, String> loginUsers = new HashMap<>();

    public void addLoginUser(Long userCd, String sessionId){
        loginUsers.put(userCd, sessionId);
    }

    public void removeLoginUser(Long userCd){
        loginUsers.remove(userCd);
    }

    public void replaceLoginUser(Long userCd, String sessionId){
        loginUsers.replace(userCd, sessionId);
    }

    public Boolean checkLoginUser(Long userCd){
        return loginUsers.containsKey(userCd);
    }

    public Boolean checkLoginUser(String sessionId){
        return loginUsers.containsValue(sessionId);
    }

    public Long checkSessionId(String sessionId){
        for (Long key : loginUsers.keySet()) {
            if (sessionId.equals(loginUsers.get(key))) {
                return key;
            }
        }
        return null;
    }

    public void notice_TRY_SOMEONE_LOGIN(Long userCd){
        messagingTemplate.convertAndSend(getNoticeDestination(userCd), "TRY_SOMEONE_LOGIN");
    }

    public void notice_AUTO_LOGOUT(Long userCd){
        messagingTemplate.convertAndSend(getNoticeDestination(userCd), "AUTO_LOGOUT");
    }

    private String getNoticeDestination(Long userCd) {
        return "/topic/user/" + userCd;
    }
}
