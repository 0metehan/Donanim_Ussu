package com.example.donanim_ussu.guvenlik;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey anahtar;

    // Çerezler  1 saat gecerli
    private final long gecerlilikSuresi = 1000 * 60 * 60;

    public JwtUtil(@Value("${jwt.anahtar}") String anahtarMetni) {
        this.anahtar = Keys.hmacShaKeyFor(anahtarMetni.getBytes(StandardCharsets.UTF_8));
    }

    public String tokenUret(String kullaniciAdi) {
        return Jwts.builder()
                .subject(kullaniciAdi)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + gecerlilikSuresi))
                .signWith(anahtar)
                .compact();
    }
}
