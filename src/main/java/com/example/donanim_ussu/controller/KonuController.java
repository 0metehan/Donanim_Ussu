package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.dto.KonuResponse;
import com.example.donanim_ussu.entity.Konu;
import com.example.donanim_ussu.service.KonuService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public List<Konu> tumunuGetir() {
        return service.tumunuGetir();
    }

    @GetMapping("/{id}")
    public Optional<Konu> getir(@PathVariable Long id) {
        return service.getir(id);
    }
}
