package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.entity.Konu;
import com.example.donanim_ussu.service.KonuService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Konu")
public class KonuController {

    private final KonuService service;

    public KonuController(KonuService service) {
        this.service = service;
    }

    @GetMapping
    public List<Konu> tumunuGetir(@RequestParam(required = false) Long kategoriId) {
        return service.tumunuGetir(kategoriId);
    }

    @GetMapping("/{id}")
    public Optional<Konu> getir(@PathVariable Long id) {
        return service.getir(id);
    }

    @PostMapping
    public Konu ekle(@RequestBody Konu konu) {
        return service.ekle(konu);
    }

    @PutMapping("/{id}")
    public void guncelle(@PathVariable Long id, @RequestBody Konu konu) {
        service.guncelle(id, konu);
    }

    @DeleteMapping("/{id}")
    public void sil(@PathVariable Long id) {
        service.sil(id);
    }
}
