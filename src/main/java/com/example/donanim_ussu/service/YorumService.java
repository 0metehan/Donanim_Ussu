package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Yorum;
import com.example.donanim_ussu.repository.YorumRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class YorumService {

    private final YorumRepository repository;

    public YorumService(YorumRepository repository) {
        this.repository = repository;
    }

    public List<Yorum> tumunuGetir() {
        return repository.findAll();
    }

    public Optional <Yorum> getir(Long id) {
        return repository.findById(id);
    }

    public Yorum ekle(Yorum yorum) {
        yorum.setId(null);
        return repository.save(yorum);
    }

    public void guncelle(Long id, Yorum yeni) {
        Yorum yorum = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yorum bulunamadi"));
        yorum.setIcerik(yeni.getIcerik());
        repository.save(yorum);
    }

    public void sil(Long id) {
        repository.deleteById(id);
    }
}
