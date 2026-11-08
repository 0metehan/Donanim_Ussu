package com.example.donanim_ussu.service;

import com.example.donanim_ussu.dto.KullaniciResponse;
import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.repository.KullaniciRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class KullaniciService {

    private final KullaniciRepository repository;

    public KullaniciService(KullaniciRepository repository) {
        this.repository = repository;
    }

    public List<Kullanici> tumunuGetir() {
        return repository.findAll();
    }

    public Optional<Kullanici> getir(Long id) {
        return repository.findById(id);
    }
}
