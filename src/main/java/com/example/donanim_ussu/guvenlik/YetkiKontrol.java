package com.example.donanim_ussu.guvenlik;

import com.example.donanim_ussu.entity.Kullanici;
import com.example.donanim_ussu.entity.Rol;
import com.example.donanim_ussu.repository.KullaniciRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class YetkiKontrol {

    private final KullaniciRepository repository;

    public YetkiKontrol(KullaniciRepository repository) {
        this.repository = repository;
    }

    public Kullanici girisYapan() {
        Authentication kimlik = SecurityContextHolder.getContext().getAuthentication();
        if (kimlik == null || kimlik instanceof AnonymousAuthenticationToken) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Giris yapmaniz gerekiyor");
        }
        Kullanici kullanici = repository.findByKullaniciAdi(kimlik.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Kullanici bulunamadi"));
        if (kullanici.isBanli()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Hesabiniz banlandi");
        }
        return kullanici;
    }

    public void sahibiVeyaYetkili(Kullanici sahip) {
        Kullanici ben = girisYapan();
        boolean yetkili = ben.getRol() == Rol.MODERATOR || ben.getRol() == Rol.ADMIN;
        if (!yetkili && !ben.getId().equals(sahip.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bu islem icin yetkiniz yok");
        }
    }

    public void yetkiliMi() {
        Rol rol = girisYapan().getRol();
        if (rol != Rol.MODERATOR && rol != Rol.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bu islemi sadece moderator veya admin yapabilir");
        }
    }

    public void adminMi() {
        if (girisYapan().getRol() != Rol.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bu islemi sadece admin yapabilir");
        }
    }
}
