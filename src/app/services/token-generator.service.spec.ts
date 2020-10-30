import { TestBed } from '@angular/core/testing';

import { TokenGeneratorService } from './token-generator.service';

describe('TokenGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenGeneratorService = TestBed.get(TokenGeneratorService);
    expect(service).toBeTruthy();
  });

  it('generateAuthToken should provide correct hash', () => {
    const service: TokenGeneratorService = TestBed.get(TokenGeneratorService);
    expect(service.generateAuthToken(' WilliamDunn@Live.Com ')).toEqual('714b094aab1179f0b6eb7a42e429960c');
   })
});
