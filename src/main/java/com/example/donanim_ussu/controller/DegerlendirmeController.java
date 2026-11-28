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

    clic List<Degerlendirme> getir(@RequestParam(required = false) Long konuId,
                                    @RequestParam(required = false) Long kullaniciId) {
        if (kullaniciId != null) return service.kullaniciIcin(kullaniciId);
        if (konuId != null) return service.konuIcin(konuId);
        return service.tumu();
    }

    @PostMapping
    public void puanla(@RequestBody Degerlendirme degerlendirme) {
        service.puanla(degerlendirme);
    }
}
