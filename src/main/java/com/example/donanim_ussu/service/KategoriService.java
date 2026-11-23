package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Kategori;
import com.example.donanim_ussu.guvenlik.YetkiKontrol;
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
    private final YetkiKontrol yetkiKontrol;

    public KategoriService(KategoriRepository repository, YetkiKontrol yetkiKontrol) {
        this.repository = repository;
        this.yetkiKontrol = yetkiKontrol;
    }

    public List<Kategori> tumunuGetir() {
        return repository.findAll();
    }

    public Optional<Kategori> getir(Long id) {
        return repository.findById(id);
    }

    public void kategoriSil(Long id) {
        yetkiKontrol.adminMi();
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu kategoride konular var");
        }
    }

    public Kategori ekle(Kategori kategori) {
        yetkiKontrol.adminMi();
        kategori.setId(null);
        return repository.save(kategori);
    }

    public Kategori guncelle(Long id, Kategori yeni) {
        yetkiKontrol.adminMi();
        Kategori kategori = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kategori bulunamadi"));
        kategori.setAd(yeni.getAd());
        kategori.setAciklama(yeni.getAciklama());
        return repository.save(kategori);
    }
}
