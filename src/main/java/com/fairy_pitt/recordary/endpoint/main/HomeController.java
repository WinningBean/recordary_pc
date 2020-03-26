package com.fairy_pitt.recordary.endpoint.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
    @GetMapping({"/", "home", "index", "start"})
    public String Index(){
        return "index";
    }
}
