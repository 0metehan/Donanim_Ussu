package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.service.KullaniciService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
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

    @PostMapping("/giris")
    public Map<String, String> giris(@RequestBody Map<String, String> istek) {
        String token = service.giris(istek.get("kullaniciAdi"), istek.get("sifre"));
        return Map.of("token", token);
    }

    @PostMapping
    public Kullanici ekle(@RequestBody Kullanici kullanici) {
        return service.ekle(kullanici);
    }

    @PutMapping("/{id}")
    public Kullanici guncelle(@PathVariable Long id, @RequestBody Kullanici kullanici) {
        return service.guncelle(id, kullanici);
    }

    @DeleteMapping("/{id}")
    public void sil(@PathVariable Long id) {
        service.sil(id);
    }
}
