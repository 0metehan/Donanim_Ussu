package com.example.donanim_ussu.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "kullanicilar")
@Getter
@Setter
@NoArgsConstructor
public class Kullanici {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kullanici_adi", nullable = false, unique = true, length = 50)
    private String kullaniciAdi;

    @Column(name = "eposta", nullable = false, unique = true, length = 100)
    private String eposta;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "sifre_hash", nullable = false)
    private String sifreHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false, length = 20)
    private Rol rol = Rol.KULLANICI;

    @Column(name = "uyari_sayisi", nullable = false, columnDefinition = "int default 0")
    private int uyariSayisi;

    @Column(name = "banli", nullable = false, columnDefinition = "bit default 0")
    private boolean banli;

    @Column(name = "biyografi", columnDefinition = "TEXT")
    private String biyografi;

    // Seçilen hazır profil fotoğrafının dosya adı (örn. "islemci.png"); dosyalar frontend/public/avatarlar içinde
    @Column(name = "avatar", length = 100)
    private String avatar;

    @Column(name = "olusturma_tarihi", nullable = false, updatable = false)
    private LocalDateTime olusturmaTarihi;

    @PrePersist
    void olusturmadanOnce() {
        olusturmaTarihi = LocalDateTime.now();
    }
}
