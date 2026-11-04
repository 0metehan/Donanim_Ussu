package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.service.KullaniciService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Kullanici")
public class KullaniciController {

    private final KullaniciService service;

    public KullaniciController(KullaniciService service) {
        this.service = service;
    }
}
