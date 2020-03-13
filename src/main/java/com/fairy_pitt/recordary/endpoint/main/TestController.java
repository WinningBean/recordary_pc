package com.fairy_pitt.recordary.endpoint.main;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {
    @GetMapping("/getMapping")
    public String getMapping(){
        return "get mapping";
    }
    @PostMapping("/postMapping")
    public String postMapping(){
        return "post mapping";
    }
    @PutMapping("/putMapping")
    public String putMapping(){
        return "put mapping";
    }
    @DeleteMapping("/deleteMapping")
    public String deleteMapping(){
        return "delete mapping";
    }
}
