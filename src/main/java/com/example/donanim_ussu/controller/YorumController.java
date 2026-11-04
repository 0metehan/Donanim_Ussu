package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.service.YorumService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Yorum")
public class YorumController {

    private final YorumService service;

    public YorumController(YorumService service) {
        this.service = service;
    }
}
