package com.example.donanim_ussu.service;

import com.example.donanim_ussu.repository.YorumRepository;
import org.springframework.stereotype.Service;

@Service
public class YorumService {

    private final YorumRepository repository;

    public YorumService(YorumRepository repository) {
        this.repository = repository;
    }
}
