package com.example.donanim_ussu.dto;

import com.example.donanim_ussu.entity.Kategori;

public record KategoriResponse(Long id, String ad, String aciklama) {

    public static KategoriResponse from(Kategori kategori) {
        return new KategoriResponse(kategori.getId(), kategori.getAd(), kategori.getAciklama());
    }
}
