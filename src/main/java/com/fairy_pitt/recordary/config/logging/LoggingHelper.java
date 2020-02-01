package com.fairy_pitt.recordary.config.logging;

import com.fairy_pitt.recordary.config.helper.JsonHelper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

public class LoggingHelper {
    public static boolean isWebJar(HttpServletRequest request) {
        return request.getRequestURI().startsWith("/webjars");
    }

    public static boolean isSwagger(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        return requestURI.startsWith("/swagger") ||
                requestURI.startsWith("/v2/api-docs");
    }

    public static String getParametersFrom(ServletRequest request) {
        return Collections.list(request.getParameterNames())
                .stream()
                .map(name -> StringUtils.join(name, ":", request.getParameter(name)))
                .reduce((x, y) -> StringUtils.join(x, ", ", y))
                .orElse("");
    }

    public static Map<String, String> getHeadersFrom(BodyFetchedHttpRequestWrapper request) {
        Map<String, String> map = new HashMap<>();

        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }

        return map;
    }

    public static Map<String, String> getHeadersFrom(OutputStreamCopiedHttpResponseWrapper response) {
        Map<String, String> map = new HashMap<>();

        Collection<String> headerNames = response.getHeaderNames();
        headerNames.forEach(key -> {
            String value = response.getHeader(key);
            map.put(key, value);
        });

        return map;
    }

    public static String getBodyFrom(HttpServletRequest request) throws IOException {
        String requestBody = getPlainBodyFrom(request.getInputStream());
        if (requestBody.isEmpty())
            return "";

        JsonNode requestJsonBody = JsonHelper.convertStringToJsonNode(requestBody);

        return JsonHelper.getStringFromObject(requestJsonBody);
    }

    public static String getBodyFrom(OutputStreamCopiedHttpResponseWrapper response) throws IOException {
        return new String(response.getCopy(), response.getResponse().getCharacterEncoding());
    }

    private static String getPlainBodyFrom(InputStream inputStream) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }
        return stringBuilder.toString();
    }

    private static void change(JsonNode parent, String fieldName, String newValue) {
        if (parent.has(fieldName)) {
            ((ObjectNode) parent).put(fieldName, newValue);
        }

        for (JsonNode child : parent) {
            change(child, fieldName, newValue);
        }
    }
}