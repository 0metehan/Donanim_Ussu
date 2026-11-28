package com.example.donanim_ussu.repository;

import com.example.donanim_ussu.entity.Degerlendirme;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DegerlendirmeRepository extends JpaRepository<Degerlendirme, Long> {

    Optional<Degerlendirme> findByKullaniciIdAndKonuId(Long kullaniciId, Long konuId);

    Optional<Degerlendirme> findByKullaniciIdAndYorumId(Long kullaniciId, Long yorumId);

    @EntityGraph(attributePaths = {"kullanici", "konu", "konu.kullanici", "konu.kategori",
            "yorum", "yorum.kullanici", "yorum.konu", "yorum.konu.kullanici", "yorum.konu.kategori"})
    @Query("select d from Degerlendirme d left join d.konu k left join d.yorum y "
            + "where k.id = :konuId or y.konu.id = :konuId")
    List<Degerlendirme> konununTumPuanlari(Long konuId);

    @EntityGraph(attributePaths = {"kullanici", "konu", "konu.kullanici", "konu.kategori",
            "yorum", "yorum.kullanici", "yorum.konu", "yorum.konu.kullanici", "yorum.konu.kategori"})
    @Query("select d from Degerlendirme d left join d.konu k left join d.yorum y "
            + "where k.kullanici.id = :kullaniciId or y.kullanici.id = :kullaniciId")
    List<Degerlendirme> kullanicininAldigiPuanlar(Long kullaniciId);
}
