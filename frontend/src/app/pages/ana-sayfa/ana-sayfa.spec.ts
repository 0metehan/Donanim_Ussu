import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnaSayfa } from './ana-sayfa';

describe('AnaSayfa', () => {
  let component: AnaSayfa;
  let fixture: ComponentFixture<AnaSayfa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaSayfa],
    }).compileComponents();

    fixture = TestBed.createComponent(AnaSayfa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
