import { TestBed } from '@angular/core/testing';
import { doesNotThrow } from 'assert';
import { Question } from '../models/question.model';

import { ApiService } from './api.service';
import { DataService } from './data.service';
import { MockDataService, mockMap } from './mocks/mock.data.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: DataService, useClass:  MockDataService }
    ]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('getQuestions should return an observable of Questions[] in order by ID', (done: DoneFn) => {
    const service: ApiService = TestBed.get(ApiService);
    let response = mockMap.get('questions') as Question[];
    service.getQuestions().subscribe(r => {
      expect(r).toBe(response.sort((a: Question, b: Question) => a.id - b.id));
      done();
    })
  });

  it('searchNAICS should return an observable of Classifications[]', (done: DoneFn) => {
    const service: ApiService = TestBed.get(ApiService);
    let response = mockMap.get('naics/search');
    service.searchNAICS('').subscribe(r => {
      expect(r[0]).toBe(response[0]);
      done();
    })
  });

  it('postResults should return an observable of postResponse',  (done: DoneFn) => {
    const service: ApiService = TestBed.get(ApiService);
    service.postResults([{
        question_id: 1 ,
        text: 'test1'
      }, {
        question_id: 2 ,
        text: 'test2'
      }, {
        question_id: 3 ,
        text: 'test3'
      }, {
        question_id: 4 ,
        text: 'test_4'
      }]).subscribe(r => {
      expect(r.message).toBe('success');
      done();
    })
   
  });


});
