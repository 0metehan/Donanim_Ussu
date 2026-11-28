package com.example.donanim_ussu.service;

import com.example.donanim_ussu.entity.Rapor;
import com.example.donanim_ussu.entity.Yorum;
import com.example.donanim_ussu.guvenlik.YetkiKontrol;
import com.example.donanim_ussu.repository.RaporRepository;
import com.example.donanim_ussu.repository.YorumRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class YorumService {

    private final YorumRepository repository;
    private final RaporRepository raporRepository;
    private final YetkiKontrol yetkiKontrol;
    private final DilFiltresi dilFiltresi;

    public YorumService(YorumRepository repository, RaporRepository raporRepository,
                        YetkiKontrol yetkiKontrol, DilFiltresi dilFiltresi) {
        this.repository = repository;
        this.raporRepository = raporRepository;
        this.yetkiKontrol = yetkiKontrol;
        this.dilFiltresi = dilFiltresi;
    }

    public List<Yorum> tumunuGetir(Long konuId, Long kullaniciId) {
        List<Yorum> liste;
        if (kullaniciId != null) {
            liste = repository.findByKullaniciIdOrderByOlusturmaTarihiDesc(kullaniciId);
        } else if (konuId != null) {
            liste = repository.findByKonuIdOrderByOlusturmaTarihiAsc(konuId);
        } else {
            liste = repository.findAll();
        }
        return liste.stream().filter(y -> !y.isGizli()).toList();
    }

    public Optional <Yorum> getir(Long id) {
        return repository.findById(id);
    }

    public Yorum ekle(Yorum yorum) {
        yorum.setId(null);
        yorum.setKullanici(yetkiKontrol.girisYapan());
        return denetle(repository.save(yorum));
    }

    public void guncelle(Long id, Yorum yeni) {
        Yorum yorum = bul(id);
        yetkiKontrol.sahibiVeyaYetkili(yorum.getKullanici());
        yorum.setIcerik(yeni.getIcerik());
        denetle(repository.save(yorum));
    }

    public void sil(Long id) {
        Yorum yorum = bul(id);
        yetkiKontrol.sahibiVeyaYetkili(yorum.getKullanici());
        repository.delete(yorum);
    }

    private Yorum denetle(Yorum yorum) {
        String kelime = dilFiltresi.yasakliKelime(yorum.getIcerik());
        if (kelime != null) {
            yorum.setGizli(true);
            repository.save(yorum);
            Rapor rapor = new Rapor();
            rapor.setYorum(yorum);
            rapor.setKullanici(yorum.getKullanici());
            rapor.setSebep("Otomatik: uygunsuz kelime (yorumda: \"" + kelime + "\")");
            raporRepository.save(rapor);
        }
        return yorum;
    }

    private Yorum bul(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yorum bulunamadi"));
    }
}
