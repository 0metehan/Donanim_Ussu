package com.example.donanim_ussu.dto;

import com.example.donanim_ussu.entity.Yorum;

import java.time.LocalDateTime;

public record YorumResponse(
        Long id,
        String icerik,
        Long kullaniciId,
        String kullaniciAdi,
        Long konuId,
        LocalDateTime olusturmaTarihi) {

    public static YorumResponse from(Yorum yorum) {
        return new YorumResponse(
                yorum.getId(),
                yorum.getIcerik(),
                yorum.getKullanici().getId(),
                yorum.getKullanici().getKullaniciAdi(),
                yorum.getKonu().getId(),
                yorum.getOlusturmaTarihi());
    }
}
