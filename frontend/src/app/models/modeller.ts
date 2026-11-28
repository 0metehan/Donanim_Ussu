export type Rol = 'KULLANICI' | 'MODERATOR' | 'ADMIN';

export interface Kategori {
  id: number;
  ad: string;
  aciklama?: string;
}

export interface Kullanici {
  id: number;
  kullaniciAdi: string;
  eposta?: string;
  rol?: Rol;
  uyariSayisi?: number;
  banli?: boolean;
  biyografi?: string;
  avatar?: string;
  olusturmaTarihi?: string;
}

// Seçilebilen hazır profil fotoğrafları.
// Fotoğrafı frontend/public/avatarlar/ klasörüne koy, dosya adını buraya ekle. Örn: 'islemci.png'
// (Sadece harf, rakam, - ve _ içeren adlar; uzantı png, jpg, jpeg, webp, svg ya da gif olmalı.)
export const AVATARLAR: string[] = ["pro1.svg"];

// Avatar dosya adını tarayıcıdaki adrese çevirir; avatar yoksa undefined döner (ikon gösterilir)
export function avatarAdresi(avatar?: string | null): string | undefined {
  return avatar ? `/avatarlar/${avatar}` : undefined;
}

export interface Yorum {
  id: number;
  icerik: string;
  kullanici: Kullanici;
  olusturmaTarihi: string;
  konu?: Konu;
  gizli?: boolean;
}

export interface Degerlendirme {
  id: number;
  puan: number;
  kullanici: Kullanici;
  konu: Konu | null;
  yorum: Yorum | null;
}

export interface Rapor {
  id: number;
  sebep: string;
  olusturmaTarihi: string;
  kullanici: Kullanici;
  konu: Konu | null;
  yorum: (Yorum & { konu: Konu }) | null;
}

export interface Konu {
  id: number;
  baslik: string;
  icerik: string;
  kullanici: Kullanici;
  kategori: Kategori;
  olusturmaTarihi: string;
  guncellemeTarihi?: string;
  gizli?: boolean;
}
