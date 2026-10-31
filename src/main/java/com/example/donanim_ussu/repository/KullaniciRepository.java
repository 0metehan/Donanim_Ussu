package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Kullanici;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KullaniciRepository extends JpaRepository<Kullanici, Long> {

    Optional<Kullanici> findByKullaniciAdi(String kullaniciAdi);

    Optional<Kullanici> findByEposta(String eposta);

    boolean existsByKullaniciAdi(String kullaniciAdi);

    boolean existsByEposta(String eposta);
}
