import { TestBed } from '@angular/core/testing';

import { NavbarSizeService } from './navbar-size.service';

describe('NavbarSizeService', () => {
  let service: NavbarSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
