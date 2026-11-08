package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.dto.KullaniciResponse;
import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.service.KullaniciService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Kullanici")
public class KullaniciController {

    private final KullaniciService service;

    public KullaniciController(KullaniciService service) {
        this.service = service;
    }

    @GetMapping
    public List<Kullanici> tumunuGetir() {
        return service.tumunuGetir();
    }

    @GetMapping("/{id}")
    public Optional<Kullanici> getir(@PathVariable Long id) {
        return service.getir(id);
    }
}
