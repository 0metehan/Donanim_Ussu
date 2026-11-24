package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Yorum;
import com.example.donanim_ussu.guvenlik.YetkiKontrol;
import com.example.donanim_ussu.repository.YorumRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class YorumService {

    private final YorumRepository repository;
    private final YetkiKontrol yetkiKontrol;

    public YorumService(YorumRepository repository, YetkiKontrol yetkiKontrol) {
        this.repository = repository;
        this.yetkiKontrol = yetkiKontrol;
    }

    public List<Yorum> tumunuGetir(Long konuId) {
        if (konuId != null) {
            return repository.findByKonuIdOrderByOlusturmaTarihiAsc(konuId);
        }
        return repository.findAll();
    }

    public Optional <Yorum> getir(Long id) {
        return repository.findById(id);
    }

    public Yorum ekle(Yorum yorum) {
        yorum.setId(null);
        // Yorumun sahibi her zaman giris yapan kullanicidir
        yorum.setKullanici(yetkiKontrol.girisYapan());
        return repository.save(yorum);
    }

    public void guncelle(Long id, Yorum yeni) {
        Yorum yorum = bul(id);
        yetkiKontrol.sahibiVeyaYetkili(yorum.getKullanici());
        yorum.setIcerik(yeni.getIcerik());
        repository.save(yorum);
    }

    public void sil(Long id) {
        Yorum yorum = bul(id);
        yetkiKontrol.sahibiVeyaYetkili(yorum.getKullanici());
        repository.delete(yorum);
    }

    private Yorum bul(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yorum bulunamadi"));
    }
}
