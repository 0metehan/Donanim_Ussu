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
}

export interface Yorum {
  id: number;
  icerik: string;
  kullanici: Kullanici;
  olusturmaTarihi: string;
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
}
