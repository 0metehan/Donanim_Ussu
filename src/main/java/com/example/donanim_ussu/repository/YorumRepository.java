package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Yorum;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface YorumRepository extends JpaRepository<Yorum, Long> {

    @Override
    @EntityGraph(attributePaths = {"kullanici", "konu", "konu.kullanici", "konu.kategori"})
    List<Yorum> findAll();

    @Override
    @EntityGraph(attributePaths = {"kullanici", "konu", "konu.kullanici", "konu.kategori"})
    Optional<Yorum> findById(Long id);

    @EntityGraph(attributePaths = {"kullanici", "konu", "konu.kullanici", "konu.kategori"})
    List<Yorum> findByKonuIdOrderByOlusturmaTarihiAsc(Long konuId);

    @EntityGraph(attributePaths = {"kullanici", "konu", "konu.kullanici", "konu.kategori"})
    List<Yorum> findByKullaniciIdOrderByOlusturmaTarihiDesc(Long kullaniciId);
}
