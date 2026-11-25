import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GirisPenceresi } from './giris-penceresi';

describe('GirisPenceresi', () => {
  let component: GirisPenceresi;
  let fixture: ComponentFixture<GirisPenceresi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GirisPenceresi],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GirisPenceresi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
