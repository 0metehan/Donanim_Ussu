package com.example.donanim_ussu.controller;

import com.example.donanim_ussu.entity.Yorum;
import com.example.donanim_ussu.service.YorumService;
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
@RequestMapping("/Yorum")
public class YorumController {

    private final YorumService service;

    public YorumController(YorumService service) {
        this.service = service;
    }

    @GetMapping
    public List<Yorum> tumunuGetir(@RequestParam(required = false) Long konuId) {
        return service.tumunuGetir(konuId);
    }

    @GetMapping("/{id}")
    public Optional<Yorum> getir(@PathVariable Long id) {
        return service.getir(id);
    }

    @PostMapping
    public Yorum ekle(@RequestBody Yorum yorum) {
        return service.ekle(yorum);
    }

    @PutMapping("/{id}")
    public void guncelle(@PathVariable Long id, @RequestBody Yorum yorum) {
        service.guncelle(id, yorum);
    }

    @DeleteMapping("/{id}")
    public void sil(@PathVariable Long id) {
        service.sil(id);
    }
}
