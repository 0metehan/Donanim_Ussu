package com.example.donanim_ussu.service;

import com.example.donanim_ussu.repository.KullaniciRepository;
import org.springframework.stereotype.Service;

@Service
public class KullaniciService {

    private final KullaniciRepository repository;

    public KullaniciService(KullaniciRepository repository) {
        this.repository = repository;
    }
}
