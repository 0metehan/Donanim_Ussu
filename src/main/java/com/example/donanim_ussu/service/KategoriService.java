package com.example.donanim_ussu.service;

import com.example.donanim_ussu.dto.KategoriResponse;
import com.example.donanim_ussu.entity.Kategori;
import com.example.donanim_ussu.repository.KategoriRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class KategoriService {

    private final KategoriRepository repository;

    public KategoriService(KategoriRepository repository) {
        this.repository = repository;
    }

    public List<Kategori> tumunuGetir() {
        return repository.findAll();
    }

    public KategoriResponse getir(Long id) {
        return repository.findById(id)
                .map(KategoriResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kategori bulunamadi"));
    }
}
