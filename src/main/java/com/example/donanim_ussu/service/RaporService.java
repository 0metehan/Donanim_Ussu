package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.entity.Rapor;
import com.example.donanim_ussu.guvenlik.YetkiKontrol;
import com.example.donanim_ussu.repository.KullaniciRepository;
import com.example.donanim_ussu.repository.RaporRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RaporService {

    private final RaporRepository repository;
    private final KullaniciRepository kullaniciRepository;
    private final YetkiKontrol yetkiKontrol;

    public RaporService(RaporRepository repository, KullaniciRepository kullaniciRepository, YetkiKontrol yetkiKontrol) {
        this.repository = repository;
        this.kullaniciRepository = kullaniciRepository;
        this.yetkiKontrol = yetkiKontrol;
    }

    public List<Rapor> tumunuGetir() {
        yetkiKontrol.yetkiliMi();
        return repository.findAllByOrderByOlusturmaTarihiDesc();
    }

    public void ekle(Rapor rapor) {
        rapor.setKullanici(yetkiKontrol.girisYapan());
        repository.save(rapor);
    }

    @Transactional
    public void sil(Long id) {
        yetkiKontrol.yetkiliMi();
        Rapor rapor = repository.findById(id).orElseThrow();
        if (rapor.getYorum() != null) rapor.getYorum().setGizli(false);
        if (rapor.getKonu() != null) rapor.getKonu().setGizli(false);
        repository.delete(rapor);
    }

    @Transactional
    public Kullanici uyar(Long id) {
        yetkiKontrol.yetkiliMi();
        Rapor rapor = repository.findById(id).orElseThrow();
        Kullanici sahip = rapor.getYorum() != null ? rapor.getYorum().getKullanici() : rapor.getKonu().getKullanici();
        sahip.setUyariSayisi(sahip.getUyariSayisi() + 1);
        if (sahip.getUyariSayisi() >= 3) {
            sahip.setBanli(true);
        }
        kullaniciRepository.save(sahip);
        repository.delete(rapor);
        return sahip;
    }
}
