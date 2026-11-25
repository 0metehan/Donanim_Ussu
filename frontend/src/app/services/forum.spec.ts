import { TestBed } from '@angular/core/testing';
import { Forum } from './forum';

describe('Forum', () => {
  let service: Forum;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Forum);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
