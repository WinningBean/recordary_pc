package com.fairy_pitt.recordary.endpoint.main;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequiredArgsConstructor
@Controller
public class MainController {
    @ResponseBody
    @GetMapping("/timeLine")
    public void timeLine(){

    }
}