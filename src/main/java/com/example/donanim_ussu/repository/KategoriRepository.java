package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Kategori;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KategoriRepository extends JpaRepository<Kategori, Long> {

    Optional<Kategori> findByAd(String ad);
}
