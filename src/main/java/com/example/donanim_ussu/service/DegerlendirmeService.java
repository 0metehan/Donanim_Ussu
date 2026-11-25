package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Degerlendirme;
import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.guvenlik.YetkiKontrol;
import com.example.donanim_ussu.repository.DegerlendirmeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DegerlendirmeService {

    private final DegerlendirmeRepository repository;
    private final YetkiKontrol yetkiKontrol;

    public DegerlendirmeService(DegerlendirmeRepository repository, YetkiKontrol yetkiKontrol) {
        this.repository = repository;
        this.yetkiKontrol = yetkiKontrol;
    }

    public List<Degerlendirme> konuIcin(Long konuId) {
        return repository.konununTumPuanlari(konuId);
    }

    // Ayni kisi tekrar puan verirse eski puani guncellenir
    public void puanla(Degerlendirme gelen) {
        Kullanici ben = yetkiKontrol.girisYapan();
        Degerlendirme d = gelen.getKonu() != null
                ? repository.findByKullaniciIdAndKonuId(ben.getId(), gelen.getKonu().getId()).orElse(gelen)
                : repository.findByKullaniciIdAndYorumId(ben.getId(), gelen.getYorum().getId()).orElse(gelen);
        d.setKullanici(ben);
        d.setPuan(gelen.getPuan());
        repository.save(d);
    }
}
