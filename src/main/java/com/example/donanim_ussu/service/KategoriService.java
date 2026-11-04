package com.example.donanim_ussu.service;

import com.example.donanim_ussu.repository.KategoriRepository;
import org.springframework.stereotype.Service;

@Service
public class KategoriService {

    private final KategoriRepository repository;

    public KategoriService(KategoriRepository repository) {
        this.repository = repository;
    }
}
