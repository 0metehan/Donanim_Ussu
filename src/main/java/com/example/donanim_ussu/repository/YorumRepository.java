package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Yorum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface YorumRepository extends JpaRepository<Yorum, Long> {

    List<Yorum> findByKonuIdOrderByOlusturmaTarihiAsc(Long konuId);

    long countByKonuId(Long konuId);
}
