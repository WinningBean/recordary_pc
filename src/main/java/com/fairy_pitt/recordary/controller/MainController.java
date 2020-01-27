package com.fairy_pitt.recordary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class MainController {

    @Autowired
    private HttpSession session;

    @GetMapping(value = "/")
    public String Index(){
        return "index";
    }
}
