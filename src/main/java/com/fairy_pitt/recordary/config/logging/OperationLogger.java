package com.fairy_pitt.recordary.config.logging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Slf4j
@Component
public class OperationLogger {
    private static final String LOGGING_FORMAT = "\n" +
            "Started {} {} for {} at {}\n" +
            "Headers : {}\n" +
            "Params : {}\n" +
            "Request body : {}\n" +
            "Response body : {}\n" +
            "Completed {} in {}ms";

    private static final String ERROR_LOGGING_FORMAT = "{} {} at {}\n" +
            "Request body : {}\n" +
            "Response body : {}\n" +
            "Completed {} in {}ms";

    public void info(LocalDateTime startTime,
                     BodyFetchedHttpRequestWrapper request,
                     OutputStreamCopiedHttpResponseWrapper response) {
        try {
            if (ChronoUnit.SECONDS.between(startTime, LocalDateTime.now()) > 10) {
                log.error(ERROR_LOGGING_FORMAT,
                        request.getMethod(),
                        request.getRequestURI(),
                        startTime,
                        LoggingHelper.getBodyFrom(request),
                        LoggingHelper.getBodyFrom(response),
                        response.getStatus(),
                        ChronoUnit.MILLIS.between(startTime, LocalDateTime.now()));
            }

            log.info(LOGGING_FORMAT,
                    request.getMethod(),
                    request.getRequestURI(),
                    request.getRemoteAddr(),
                    startTime,
                    LoggingHelper.getHeadersFrom(request),
                    LoggingHelper.getParametersFrom(request),
                    LoggingHelper.getBodyFrom(request),
                    LoggingHelper.getBodyFrom(response),
                    response.getStatus(),
                    ChronoUnit.MILLIS.between(startTime, LocalDateTime.now()));
        } catch (IOException e) {
            log.error("{}", e.getMessage(), e);
        }
    }
}