package com.example.donanim_ussu.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "yorumlar")
@Getter
@Setter
@NoArgsConstructor
public class Yorum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "icerik", nullable = false, columnDefinition = "TEXT")
    private String icerik;

    // Yorumu yazan kullanici
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kullanici_id", nullable = false)
    private Kullanici kullanici;

    // Yorumun yazildigi konu
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "konu_id", nullable = false)
    private Konu konu;

    @Column(name = "olusturma_tarihi", nullable = false, updatable = false)
    private LocalDateTime olusturmaTarihi;

    @PrePersist
    void olusturmadanOnce() {
        olusturmaTarihi = LocalDateTime.now();
    }
}
