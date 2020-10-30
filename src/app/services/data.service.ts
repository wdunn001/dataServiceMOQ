import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataServiceOptions } from '../models/data-service-options.model';
import { TokenGeneratorService } from './token-generator.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  authToken: string = 'e60ce72ecdebc37631b0cc1de13a2f15';

  constructor(private http: HttpClient, token: TokenGeneratorService) {
    if (token) {this.authToken = token.generateAuthToken(environment.email);}
   }

  public get<T>(url: string, params?: any): Observable<T> {
    const options = new DataServiceOptions();
    options.method = 'GET';
    options.url = url;
    options.params = params;
    return this.request(options).pipe(map( r => r.body as T));
  }


  public post<T>(url: string, data?: any, params?: any): Observable<T> {
    if (!data) {
      data = params;
      params = {};
    }
    const options = new DataServiceOptions();
    options.method = 'POST';
    options.url = url;
    options.params = params;
    options.data = data;
    return this.request(options).pipe(map( r => r.body as T));
  }

  protected request(options: DataServiceOptions): Observable<Response | HttpResponse<Object>> {
    options.method = (options.method || 'GET');
    options.url = (options.url || '');
    options.headers = (options.headers || {});
    options.params = (options.params || {});
    options.data = (options.data || {});

    this.interpolateUrl(options);
    this.addContentType(options);
    this.addAuthToken(options, this.authToken);

    const requestOptions = {
      headers: new HttpHeaders(options.headers),
      params: new HttpParams({ fromObject: options.params })
    };

    return this.http
      .request(options.method, environment.API_BASE_URL + options.url, {
        body: JSON.stringify(options.data),
        headers: requestOptions.headers,
        params: requestOptions.params,
        observe: 'response'
      })

  }

  private addContentType(options: DataServiceOptions): DataServiceOptions {
    options.headers['Content-Type'] = 'application/json; charset=UTF-8';
    return options;
  }

  private interpolateUrl(options: DataServiceOptions): DataServiceOptions {
    options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, ($0, token) => {
      if (options.params.hasOwnProperty(token)) {
        return (this.extractValue(options.params, token));
      }
      if (options.data.hasOwnProperty(token)) {
        return (this.extractValue(options.data, token));
      }
      return ('');
    });
    options.url = options.url.replace(/\/{2,}/g, '/');
    options.url = options.url.replace(/\/+$/g, '');
    return options;
  }

  private extractValue(collection: any, key: string): any {
    const value = collection[key];
    delete (collection[key]);
    return value;
  }

  private addAuthToken(options: DataServiceOptions, token: string): DataServiceOptions {

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
    return options;
  }



}
