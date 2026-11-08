package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.dto.KategoriResponse;
import com.example.donanim_ussu.entity.Kategori;
import com.example.donanim_ussu.service.KategoriService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Kategori")
public class KategoriController {

    private final KategoriService service;

    public KategoriController(KategoriService service) {
        this.service = service;
    }

    @GetMapping
    public List<Kategori> tumunuGetir() {
        return service.tumunuGetir();
    }

    @GetMapping("/{id}")
    public KategoriResponse getir(@PathVariable Long id) {
        return service.getir(id);
    }
}
