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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "raporlar")
@Getter
@Setter
@NoArgsConstructor
public class Rapor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sebep", nullable = false, length = 500)
    private String sebep;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kullanici_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Kullanici kullanici;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "konu_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Konu konu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "yorum_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Yorum yorum;

    @Column(name = "olusturma_tarihi", nullable = false, updatable = false)
    private LocalDateTime olusturmaTarihi;

    @PrePersist
    void olusturmadanOnce() {
        olusturmaTarihi = LocalDateTime.now();
    }
}
