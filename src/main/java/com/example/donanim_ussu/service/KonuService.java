package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Konu;
import com.example.donanim_ussu.entity.Rapor;
import com.example.donanim_ussu.guvenlik.YetkiKontrol;
import com.example.donanim_ussu.repository.KonuRepository;
import com.example.donanim_ussu.repository.RaporRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class KonuService {

    private final KonuRepository repository;
    private final RaporRepository raporRepository;
    private final YetkiKontrol yetkiKontrol;
    private final DilFiltresi dilFiltresi;

    public KonuService(KonuRepository repository, RaporRepository raporRepository,
                       YetkiKontrol yetkiKontrol, DilFiltresi dilFiltresi) {
        this.repository = repository;
        this.raporRepository = raporRepository;
        this.yetkiKontrol = yetkiKontrol;
        this.dilFiltresi = dilFiltresi;
    }

    public List<Konu> tumunuGetir(Long kategoriId, String ara) {
        List<Konu> liste;
        if (ara != null && !ara.isBlank()) {
            liste = repository.findByBaslikContainingOrderByOlusturmaTarihiDesc(ara.trim());
        } else if (kategoriId != null) {
            liste = repository.findByKategoriIdOrderByOlusturmaTarihiDesc(kategoriId);
        } else {
            liste = repository.findAll();
        }
        return liste.stream().filter(k -> !k.isGizli()).toList();
    }

    public Optional<Konu> getir(Long id) {
                return repository.findById(id);
    }

    public Konu ekle(Konu konu) {
        konu.setId(null);
        konu.setKullanici(yetkiKontrol.girisYapan());
        return denetle(repository.save(konu));
    }

    public void guncelle(Long id, Konu yeni) {
        Konu konu = bul(id);
        yetkiKontrol.sahibiVeyaYetkili(konu.getKullanici());
        konu.setBaslik(yeni.getBaslik());
        konu.setIcerik(yeni.getIcerik());
        konu.setKategori(yeni.getKategori());
        denetle(repository.save(konu));
    }

    public void sil(Long id) {
        Konu konu = bul(id);
        yetkiKontrol.sahibiVeyaYetkili(konu.getKullanici());
        repository.delete(konu);
    }

    private Konu denetle(Konu konu) {
        if (dilFiltresi.uygunsuzMu(konu.getBaslik() + " " + konu.getIcerik())) {
            konu.setGizli(true);
            repository.save(konu);
            Rapor rapor = new Rapor();
            rapor.setKonu(konu);
            rapor.setKullanici(konu.getKullanici());
            rapor.setSebep("Otomatik: uygunsuz kelime");
            raporRepository.save(rapor);
        }
        return konu;
    }

    private Konu bul(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Konu bulunamadi"));
    }

}
