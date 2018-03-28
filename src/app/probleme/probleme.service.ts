import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IProbleme } from './probleme';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProblemeService {
  private baseUrl = 'api/probleme';

  constructor(private _http: HttpClient) { }
    obtenirProbleme(): Observable<IProbleme[]>{
      return this._http.get<IProbleme[]>(this.baseUrl)
      .do(data => console.log('obtenirProbleme: ' + JSON.stringify(data)))
      .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse){
      console.error(err.error);
      return Observable.throw(err.message);
    }
}
