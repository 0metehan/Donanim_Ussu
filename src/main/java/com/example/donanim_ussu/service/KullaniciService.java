package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.repository.KullaniciRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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

    public Kullanici ekle(Kullanici kullanici) {
        kullanici.setId(null);
        kullanici.setSifreHash(hashle(kullanici.getSifreHash()));
        return repository.save(kullanici);
    }

    public Kullanici guncelle(Long id, Kullanici yeni) {
        Kullanici kullanici = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kullanici bulunamadi"));
        kullanici.setKullaniciAdi(yeni.getKullaniciAdi());
        kullanici.setEposta(yeni.getEposta());
        kullanici.setSifreHash(hashle(yeni.getSifreHash()));
        kullanici.setRol(yeni.getRol());
        return repository.save(kullanici);
    }

    public void sil(Long id) {
        repository.deleteById(id);
    }
    private String hashle(String sifre) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] baytlar = md.digest(sifre.getBytes(StandardCharsets.UTF_8));
            StringBuilder sonuc = new StringBuilder();
            for (byte b : baytlar) {
                sonuc.append(String.format("%02x", b));
            }
            return sonuc.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
