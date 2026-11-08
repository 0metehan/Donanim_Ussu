package com.example.donanim_ussu.service;

import com.example.donanim_ussu.dto.KonuResponse;
import com.example.donanim_ussu.entity.Konu;
import com.example.donanim_ussu.repository.KonuRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class KonuService {

    private final KonuRepository repository;

    public KonuService(KonuRepository repository) {
        this.repository = repository;
    }

    public List<Konu> tumunuGetir() {
        return repository.findAll();
    }


    public Optional<Konu> getir(Long id) {
                return repository.findById(id);
    }


}

