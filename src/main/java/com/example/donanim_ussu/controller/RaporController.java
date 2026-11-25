package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.entity.Rapor;
import com.example.donanim_ussu.service.RaporService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Rapor")
public class RaporController {

    private final RaporService service;

    public RaporController(RaporService service) {
        this.service = service;
    }

    @GetMapping
    public List<Rapor> tumunuGetir() {
        return service.tumunuGetir();
    }

    @PostMapping
    public void ekle(@RequestBody Rapor rapor) {
        service.ekle(rapor);
    }

    @DeleteMapping("/{id}")
    public void sil(@PathVariable Long id) {
        service.sil(id);
    }

    @PostMapping("/{id}/uyar")
    public Kullanici uyar(@PathVariable Long id) {
        return service.uyar(id);
    }
}
