import { TestBed } from '@angular/core/testing';

import { ApiVeiculosService } from './api-veiculos.service';

describe('ApiVeiculosService', () => {
  let service: ApiVeiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVeiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
