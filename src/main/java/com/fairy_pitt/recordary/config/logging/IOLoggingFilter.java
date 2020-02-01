package com.fairy_pitt.recordary.config.logging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.logging.MDC;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Component
@Profile("!test")
@RequiredArgsConstructor
public class IOLoggingFilter implements Filter {
    private final OperationLogger operationLogger;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        LocalDateTime startTime = LocalDateTime.now();

        BodyFetchedHttpRequestWrapper request = new BodyFetchedHttpRequestWrapper((HttpServletRequest) servletRequest);

        MDC.put("REQUEST_ID", UUID.randomUUID().toString().substring(0, 7));
        OutputStreamCopiedHttpResponseWrapper response = new OutputStreamCopiedHttpResponseWrapper((HttpServletResponse) servletResponse);

        try {
            chain.doFilter(request, response);

            response.flushBuffer();
        } catch (Exception ex) {
            log.error("Error Applying Filter. : {}", ex.getMessage(), ex);
        } finally {
            String uri = ((HttpServletRequest) servletRequest).getRequestURI();

            if (!uri.contains("swagger")) {
                operationLogger.info(startTime, request, response);
            }
        }
    }
}