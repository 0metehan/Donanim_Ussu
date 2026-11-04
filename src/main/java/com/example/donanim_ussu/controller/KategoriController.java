package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.service.KategoriService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Kategori")
public class KategoriController {

    private final KategoriService service;

    public KategoriController(KategoriService service) {
        this.service = service;
    }
}
