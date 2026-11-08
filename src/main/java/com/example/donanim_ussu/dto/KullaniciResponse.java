package com.example.donanim_ussu.dto;

import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.entity.Rol;

import java.time.LocalDateTime;

// Sifre hash'i ve e-posta bilerek disari verilmez
public record KullaniciResponse(Long id, String kullaniciAdi, Rol rol, LocalDateTime olusturmaTarihi) {

    public static KullaniciResponse from(Kullanici kullanici) {
        return new KullaniciResponse(
                kullanici.getId(),
                kullanici.getKullaniciAdi(),
                kullanici.getRol(),
                kullanici.getOlusturmaTarihi());
    }
}
