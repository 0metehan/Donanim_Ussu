import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { KayitPenceresi } from './kayit-penceresi';

describe('KayitPenceresi', () => {
  let component: KayitPenceresi;
  let fixture: ComponentFixture<KayitPenceresi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KayitPenceresi],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(KayitPenceresi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
