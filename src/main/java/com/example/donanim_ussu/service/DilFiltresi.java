package com.example.donanim_ussu.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DilFiltresi {

    private static final Locale TR = Locale.forLanguageTag("tr");
    private final Set<String> yasakli;

    public DilFiltresi() throws IOException {
        String dosya = new String(new ClassPathResource("yasakli-kelimeler.txt")
                .getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        yasakli = dosya.lines().map(s -> s.trim().toLowerCase(TR)).collect(Collectors.toSet());
    }

    public boolean uygunsuzMu(String metin) {
        return Arrays.stream(metin.toLowerCase(TR).split("[^\\p{L}]+")).anyMatch(yasakli::contains);
    }
}
