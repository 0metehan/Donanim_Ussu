package com.example.donanim_ussu.guvenlik;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


public class JwtFiltre extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFiltre(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest istek, HttpServletResponse cevap, FilterChain zincir)
            throws ServletException, IOException {
        String baslik = istek.getHeader("Authorization");
        if (baslik != null && baslik.startsWith("Bearer ")) {
            try {
                String kullaniciAdi = jwtUtil.kullaniciAdiAl(baslik.substring(7));
                var kimlik = new UsernamePasswordAuthenticationToken(kullaniciAdi, null, List.of());
                SecurityContextHolder.getContext().setAuthentication(kimlik);
            } catch (JwtException | IllegalArgumentException e) {
            }
        }
        zincir.doFilter(istek, cevap);
    }
}
