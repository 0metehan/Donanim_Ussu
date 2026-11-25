import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AnaSayfa } from './ana-sayfa';

describe('AnaSayfa', () => {
  let component: AnaSayfa;
  let fixture: ComponentFixture<AnaSayfa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaSayfa],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AnaSayfa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
