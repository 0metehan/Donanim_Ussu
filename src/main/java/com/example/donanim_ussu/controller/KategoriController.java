package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.entity.Kategori;
import com.example.donanim_ussu.service.KategoriService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public Optional<Kategori> getir(@PathVariable Long id) {
        return service.getir(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void kategoriSil(@PathVariable Long id) {
        service.kategoriSil(id);
    }

    @PostMapping
    public Kategori ekle(@RequestBody Kategori kategori) {
        return service.ekle(kategori);
    }

    @PutMapping("/{id}")
    public Kategori guncelle(@PathVariable Long id, @RequestBody Kategori kategori) {
        return service.guncelle(id, kategori);
    }
}
