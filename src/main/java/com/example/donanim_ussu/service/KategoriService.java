package com.example.donanim_ussu.service;

import com.example.donanim_ussu.dto.KategoriResponse;
import com.example.donanim_ussu.entity.Kategori;
import com.example.donanim_ussu.repository.KategoriRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class KategoriService {

    private final KategoriRepository repository;

    public KategoriService(KategoriRepository repository) {
        this.repository = repository;
    }

    public List<Kategori> tumunuGetir() {
        return repository.findAll();
    }

    public Optional<Kategori> getir(Long id) {
        return repository.findById(id);
    }

    public void kategoriSil(Long id) {
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu kategoride konular var");
        }
    }
}
