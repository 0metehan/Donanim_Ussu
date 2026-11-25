import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UstBar } from './ust-bar';

describe('UstBar', () => {
  let component: UstBar;
  let fixture: ComponentFixture<UstBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UstBar],
    }).compileComponents();

    fixture = TestBed.createComponent(UstBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
