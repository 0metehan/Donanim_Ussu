package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.service.KonuService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Konu")
public class KonuController {

    private final KonuService service;

    public KonuController(KonuService service) {
        this.service = service;
    }
}
