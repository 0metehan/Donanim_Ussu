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
