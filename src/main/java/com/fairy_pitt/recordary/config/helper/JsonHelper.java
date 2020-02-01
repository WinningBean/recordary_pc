package com.fairy_pitt.recordary.config.helper;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class JsonHelper {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    static {
        MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        MAPPER.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        // QuattroServiceAdaptor.getOrderCompleteInfo()의 approvedAt serialize할때 사용
        MAPPER.registerModule(createLocalDateTimeSerializeModule());
    }

    // LocalDateTime to milliseconds
    private static JavaTimeModule createLocalDateTimeSerializeModule() {
        JavaTimeModule javaTimeModule = new JavaTimeModule();

        javaTimeModule.addSerializer(LocalDateTime.class, new JsonSerializer<LocalDateTime>() {
            @Override
            public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
                gen.writeNumber(value.atZone(ZoneOffset.UTC).toInstant().toEpochMilli());
            }
        });

        return javaTimeModule;
    }

    /**
     * JsonNode를 Class로 반환
     *
     * @@param JsonNode. Class
     * @@return Class
     */
    public static <T> T getClassByJsonNode(JsonNode j, Class<T> t) {
        return MAPPER.convertValue(j, t);
    }

    public static JsonNode jsonNodeFromObject(Object object) {
        return MAPPER.convertValue(object, JsonNode.class);
    }

    public static JsonNode convertStringToJsonNode(String plainText) {
        try {
            return MAPPER.readTree(plainText);
        } catch (IOException e) {
            log.error("{} : {}", e.getMessage(), plainText, e);
            return null;
        }
    }

    public static <T> T convertStringToObject(String plainText, Class<T> t) {
        try {
            return MAPPER.readValue(plainText, t);
        } catch (IOException e) {
            log.error("{} : {}", e.getMessage(), plainText, e);
            return null;
        }
    }

    public static <T> T convertStringToObject(String plainText, TypeReference t) {
        try {
            return (T) MAPPER.readValue(plainText, t);
        } catch (IOException e) {
            log.error("{} : {}", e.getMessage(), plainText, e);
            return null;
        }
    }

    public static String getStringFromObject(Object obj) {
        try {
            return MAPPER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("{} : {}", e.getMessage(), obj, e);
            return null;
        }
    }
}