import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Forum } from './forum';

describe('Forum', () => {
  let service: Forum;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Forum);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
