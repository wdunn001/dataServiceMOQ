import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NAICSClassification } from '../models/naics.model';
import { PostResponse } from '../models/post-response.mode';
import { Question, QuestionResponse } from '../models/question.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private data: DataService) { }

  public getQuestions(): Observable<Question[]> {
    return this.data.get<Question[]>('questions').pipe(map( q => q.sort((a: Question, b: Question) => a.id - b.id)));
  }

  public searchNAICS(value: string): Observable<NAICSClassification[]> {
    return this.data.get<NAICSClassification[]>('naics/search', { q: value ? value.toLowerCase(): '' });
  }

  public postResults(responses: QuestionResponse[]): Observable<PostResponse> {
    return this.data.post<PostResponse>('application_forms', { responses: responses });
  }
}




