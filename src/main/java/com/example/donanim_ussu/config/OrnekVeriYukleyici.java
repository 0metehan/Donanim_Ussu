package com.example.donanim_ussu.config;

import com.example.donanim_ussu.entity.Kategori;
import com.example.donanim_ussu.entity.Konu;
import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.entity.Rol;
import com.example.donanim_ussu.entity.Yorum;
import com.example.donanim_ussu.repository.KategoriRepository;
import com.example.donanim_ussu.repository.KonuRepository;
import com.example.donanim_ussu.repository.KullaniciRepository;
import com.example.donanim_ussu.repository.YorumRepository;
import com.example.donanim_ussu.service.KullaniciService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Uygulama acilirken bos olan her tabloya iki ornek kayit ekler.
 * Tabloda zaten veri varsa o tabloya dokunmaz.
 *
 * Ornek kullanicilarin sifresi: deneme123
 */
@Component
public class OrnekVeriYukleyici implements CommandLineRunner {

    private final KategoriRepository kategoriRepository;
    private final KullaniciRepository kullaniciRepository;
    private final KonuRepository konuRepository;
    private final YorumRepository yorumRepository;
    private final KullaniciService kullaniciService;

    public OrnekVeriYukleyici(KategoriRepository kategoriRepository,
                              KullaniciRepository kullaniciRepository,
                              KonuRepository konuRepository,
                              YorumRepository yorumRepository,
                              KullaniciService kullaniciService) {
        this.kategoriRepository = kategoriRepository;
        this.kullaniciRepository = kullaniciRepository;
        this.konuRepository = konuRepository;
        this.yorumRepository = yorumRepository;
        this.kullaniciService = kullaniciService;
    }

    @Override
    public void run(String... args) {
        kategorileriEkle();
        kullanicilariEkle();
        konulariEkle();
        yorumlariEkle();
    }

    private void kategorileriEkle() {
        if (kategoriRepository.count() > 0) {
            return;
        }
        kategoriRepository.save(kategori("Ekran Kartları", "GPU incelemeleri, karşılaştırmalar ve sorunlar"));
        kategoriRepository.save(kategori("İşlemciler", "CPU seçimi, hız aşırtma ve soğutma"));
    }

    private void kullanicilariEkle() {
        if (kullaniciRepository.count() > 0) {
            return;
        }
        // Servis uzerinden ekleniyor ki sifre hashlensin ve giris yapilabilsin
        kullaniciService.ekle(kullanici("admin", "admin@donanimussu.test", Rol.ADMIN));
        kullaniciService.ekle(kullanici("ahmet", "ahmet@donanimussu.test", Rol.KULLANICI));
    }

    private void konulariEkle() {
        if (konuRepository.count() > 0) {
            return;
        }
        List<Kullanici> kullanicilar = kullaniciRepository.findAll();
        List<Kategori> kategoriler = kategoriRepository.findAll();

        konuRepository.save(konu(
                "RTX 5070 mi RX 9070 mi?",
                "1440p oyun için hangisini önerirsiniz? Bütçem iki kart için de yetiyor.",
                kullanicilar.get(1 % kullanicilar.size()),
                kategoriler.get(0)));
        konuRepository.save(konu(
                "İşlemci sıcaklığı 90 dereceye çıkıyor",
                "Oyun açınca işlemci 90 dereceyi görüyor. Termal macun mu değişmeli, soğutucu mu yetersiz?",
                kullanicilar.get(0),
                kategoriler.get(1 % kategoriler.size())));
    }

    private void yorumlariEkle() {
        if (yorumRepository.count() > 0) {
            return;
        }
        List<Kullanici> kullanicilar = kullaniciRepository.findAll();
        List<Konu> konular = konuRepository.findAll();

        yorumRepository.save(yorum(
                "1440p için ikisi de iyi, ray tracing kullanacaksan RTX'i al.",
                kullanicilar.get(0),
                konular.get(0)));
        yorumRepository.save(yorum(
                "Önce termal macunu yenile, düzelmezse kule tipi bir soğutucuya geç.",
                kullanicilar.get(1 % kullanicilar.size()),
                konular.get(1 % konular.size())));
    }

    private Kategori kategori(String ad, String aciklama) {
        Kategori kategori = new Kategori();
        kategori.setAd(ad);
        kategori.setAciklama(aciklama);
        return kategori;
    }

    private Kullanici kullanici(String kullaniciAdi, String eposta, Rol rol) {
        Kullanici kullanici = new Kullanici();
        kullanici.setKullaniciAdi(kullaniciAdi);
        kullanici.setEposta(eposta);
        kullanici.setSifreHash("deneme123"); // servis bunu hashliyor
        kullanici.setRol(rol);
        return kullanici;
    }

    private Konu konu(String baslik, String icerik, Kullanici kullanici, Kategori kategori) {
        Konu konu = new Konu();
        konu.setBaslik(baslik);
        konu.setIcerik(icerik);
        konu.setKullanici(kullanici);
        konu.setKategori(kategori);
        return konu;
    }

    private Yorum yorum(String icerik, Kullanici kullanici, Konu konu) {
        Yorum yorum = new Yorum();
        yorum.setIcerik(icerik);
        yorum.setKullanici(kullanici);
        yorum.setKonu(konu);
        return yorum;
    }
}
