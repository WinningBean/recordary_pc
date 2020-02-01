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

    /* User */
    @RequestMapping(value = "/joinPage")
    public String joinPage(){
        return "User/join";
    }

    @RequestMapping(value = "/loginPage")
    public String loginPage(){
        return "User/login";
    }

    @GetMapping("/groupCreatePage")
    public String createGroup(){
        return "group/create";
    }

    @GetMapping("/logout")
    public String logout(){
        session.invalidate();
        return "index";
    }



}