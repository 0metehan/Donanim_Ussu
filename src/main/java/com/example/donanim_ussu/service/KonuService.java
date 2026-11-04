package com.example.donanim_ussu.service;

import com.example.donanim_ussu.repository.KonuRepository;
import org.springframework.stereotype.Service;

@Service
public class KonuService {

    private final KonuRepository repository;

    public KonuService(KonuRepository repository) {
        this.repository = repository;
    }
}
