package com.fairy_pitt.recordary.config;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class WebSocketConfig extends TextWebSocketHandler {
    private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        // 연결 요청 접수 해당 클라이언와 통신을 담당하는 WebSocketSession 객체가 전달된다.
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        // 클라이언트와 연결이 해제되면 통신을 담당하는 객체 제거
        sessions.remove(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception{
        // 클라이언와 데이터 송신 에러시 해당 통신을 담당하는 객체 제거
        sessions.remove(session);
    }

    public void notice() throws Exception{
        Iterator<WebSocketSession> iterator = sessions.iterator();

        while (iterator.hasNext()){
            WebSocketSession session = iterator.next();
            try {
                // 클라이언트에게 전송할 메세지를 TextMessage 객체로
                TextMessage message = new TextMessage("알림입니다.");
                // 클라이언트에게 전송
                session.sendMessage(message);
            } catch (IOException e){
                iterator.remove();
            }
        }
    }

    public void notice(String description, Long code, Long userCd) throws Exception{
        Iterator<WebSocketSession> iterator = sessions.iterator();
        while (iterator.hasNext()){
            WebSocketSession session = iterator.next();
            try {
                TextMessage message = new TextMessage(description + ":" + code);
                session.sendMessage(message);
            } catch (IOException e){
                iterator.remove();
            }
        }
    }
}
