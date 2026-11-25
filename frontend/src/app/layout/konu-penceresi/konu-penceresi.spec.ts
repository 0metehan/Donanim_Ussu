import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { KonuPenceresi } from './konu-penceresi';

describe('KonuPenceresi', () => {
  let component: KonuPenceresi;
  let fixture: ComponentFixture<KonuPenceresi>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonuPenceresi],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(KonuPenceresi);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('eksik alan varsa istek atmaz', () => {
    http.expectOne('/api/Kategori').flush([]);
    (component as unknown as { konuyuGonder(): void }).konuyuGonder();
    http.expectNone('/api/Konu');
  });

  it('konuyu gönderir, pencereyi kapatır ve eklendi olayını yayar', () => {
    http.expectOne('/api/Kategori').flush([{ id: 3, ad: 'İşlemciler' }]);
    const bilesen = component as unknown as {
      baslik: string;
      kategoriId: number | null;
      icerik: string;
      konuyuGonder(): void;
    };
    let eklenen: unknown = null;
    component.eklendi.subscribe((konu) => (eklenen = konu));
    component.acik.set(true);

    bilesen.baslik = '  Yeni başlık ';
    bilesen.kategoriId = 3;
    bilesen.icerik = 'İçerik';
    bilesen.konuyuGonder();

    const istek = http.expectOne('/api/Konu');
    expect(istek.request.method).toBe('POST');
    expect(istek.request.body).toEqual({ baslik: 'Yeni başlık', icerik: 'İçerik', kategori: { id: 3 } });
    istek.flush({ id: 99, baslik: 'Yeni başlık' });

    expect(component.acik()).toBe(false);
    expect(eklenen).toEqual({ id: 99, baslik: 'Yeni başlık' });
  });
});
