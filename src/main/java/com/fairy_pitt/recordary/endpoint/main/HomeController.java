package com.fairy_pitt.recordary.endpoint.main;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class HomeController {
    @GetMapping({"/", "home", "index", "start"})
    public String Index(){
        return "index";
    }
}
