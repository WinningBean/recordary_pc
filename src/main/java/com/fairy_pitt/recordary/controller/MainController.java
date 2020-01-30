package com.fairy_pitt.recordary.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@RestController
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

    @GetMapping("/logout")
    public String logout(){
        session.invalidate();
        return "index";
    }

//    @CrossOrigin
    @GetMapping(value = "/test")
    public Map<String, String> Test() {
        Map<String, String> map = new HashMap<>();
        map.put("Test", "test");

        return map;
    }

//    @CrossOrigin
    @PostMapping(value = "/testResult")
    public String TestResult(@RequestBody Map<String, Object> param){
        String str = (String)((Map)param.get("cc")).get("cc1");
        return str;
    }
}