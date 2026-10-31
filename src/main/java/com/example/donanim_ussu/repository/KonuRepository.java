package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Konu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KonuRepository extends JpaRepository<Konu, Long> {

    List<Konu> findByKategoriIdOrderByOlusturmaTarihiDesc(Long kategoriId);

    List<Konu> findByKullaniciIdOrderByOlusturmaTarihiDesc(Long kullaniciId);
}
