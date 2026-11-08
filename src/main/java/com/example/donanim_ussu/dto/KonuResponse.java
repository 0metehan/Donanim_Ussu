package com.example.donanim_ussu.dto;

import com.example.donanim_ussu.entity.Konu;

import java.time.LocalDateTime;

public record KonuResponse(
        Long id,
        String baslik,
        String icerik,
        Long kullaniciId,
        String kullaniciAdi,
        Long kategoriId,
        String kategoriAd,
        LocalDateTime olusturmaTarihi,
        LocalDateTime guncellemeTarihi) {

    public static KonuResponse from(Konu konu) {
        return new KonuResponse(
                konu.getId(),
                konu.getBaslik(),
                konu.getIcerik(),
                konu.getKullanici().getId(),
                konu.getKullanici().getKullaniciAdi(),
                konu.getKategori().getId(),
                konu.getKategori().getAd(),
                konu.getOlusturmaTarihi(),
                konu.getGuncellemeTarihi());
    }
}
