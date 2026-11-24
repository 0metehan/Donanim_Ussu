package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Konu;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KonuRepository extends JpaRepository<Konu, Long> {

    @Override
    @EntityGraph(attributePaths = {"kullanici", "kategori"})
    List<Konu> findAll();

    @Override
    @EntityGraph(attributePaths = {"kullanici", "kategori"})
    Optional<Konu> findById(Long id);

    @EntityGraph(attributePaths = {"kullanici", "kategori"})
    List<Konu> findByKategoriIdOrderByOlusturmaTarihiDesc(Long kategoriId);
}
