package com.fairy_pitt.recordary.config.logging;

import org.apache.commons.io.IOUtils;
import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class BodyFetchedHttpRequestWrapper extends HttpServletRequestWrapper {
    private byte[] bodyData;

    public BodyFetchedHttpRequestWrapper(HttpServletRequest request) throws IOException {
        super(request);
        InputStream is = super.getInputStream();
        bodyData = IOUtils.toByteArray(is);
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream bis = new ByteArrayInputStream(bodyData);
        return new SimpleServletInputStream(bis);
    }
}

class SimpleServletInputStream extends ServletInputStream {
    private InputStream is;

    SimpleServletInputStream(InputStream bis) {
        is = bis;
    }

    @Override
    public int read() throws IOException {
        return is.read();
    }

    @Override
    public int read(byte[] b) throws IOException {
        return is.read(b);
    }

    @Override
    public boolean isFinished() {
        return false;
    }

    @Override
    public boolean isReady() {
        return false;
    }

    @Override
    public void setReadListener(final ReadListener readListener) {

    }
}