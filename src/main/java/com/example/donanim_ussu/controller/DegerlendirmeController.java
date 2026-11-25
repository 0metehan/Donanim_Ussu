package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.entity.Degerlendirme;
import com.example.donanim_ussu.service.DegerlendirmeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Degerlendirme")
public class DegerlendirmeController {

    private final DegerlendirmeService service;

    public DegerlendirmeController(DegerlendirmeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Degerlendirme> konuIcin(@RequestParam Long konuId) {
        return service.konuIcin(konuId);
    }

    @PostMapping
    public void puanla(@RequestBody Degerlendirme degerlendirme) {
        service.puanla(degerlendirme);
    }
}
