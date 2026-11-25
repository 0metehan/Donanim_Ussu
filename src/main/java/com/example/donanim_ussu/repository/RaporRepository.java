package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Rapor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RaporRepository extends JpaRepository<Rapor, Long> {

    @EntityGraph(attributePaths = {"kullanici", "konu", "konu.kullanici", "konu.kategori",
            "yorum", "yorum.kullanici", "yorum.konu", "yorum.konu.kullanici", "yorum.konu.kategori"})
    List<Rapor> findAllByOrderByOlusturmaTarihiDesc();
}
