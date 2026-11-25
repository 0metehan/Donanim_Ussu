export interface Kategori {
  id: number;
  ad: string;
  aciklama?: string;
}

export interface Kullanici {
  id: number;
  kullaniciAdi: string;
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
