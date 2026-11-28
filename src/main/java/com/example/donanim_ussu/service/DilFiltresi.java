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
        yasakli = dosya.lines().map(s -> s.trim().toLowerCase(TR))
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toSet());
    }

    // Metindeki ilk yasaklı kelimeyi döndürür; yoksa null
    public String yasakliKelime(String metin) {
        if (metin == null) return null;
        return Arrays.stream(metin.toLowerCase(TR).split("[^\\p{L}]+"))
                .map(this::yasakliParca)
                .filter(k -> k != null)
                .findFirst()
                .orElse(null);
    }

    // Kelime tamamen yasaklı kelimelerin art arda yazılmasından oluşuyorsa (örn. "xxxxxx" = "xxx"+"xxx")
    // ilk parçayı döndürür; değilse null. Sadece kelimenin İÇİNDE geçmek yetmez, böylece yasaklı bir
    // kelimeyi içinde barındıran masum kelimeler (örn. "götürmek") yakalanmaz.
    private String yasakliParca(String kelime) {
        int n = kelime.length();
        // onceki[i] >= 0: kelimenin ilk i harfi yasaklı parçalara bölünebiliyor, son parça onceki[i]'de başlıyor
        int[] onceki = new int[n + 1];
        Arrays.fill(onceki, -1);
        onceki[0] = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (onceki[j] >= 0 && yasakli.contains(kelime.substring(j, i))) {
                    onceki[i] = j;
                    break;
                }
            }
        }
        if (n == 0 || onceki[n] < 0) return null;
        // Geriye doğru yürüyüp ilk parçayı bul
        int bitis = n;
        while (onceki[bitis] != 0) bitis = onceki[bitis];
        return kelime.substring(0, bitis);
    }
}
