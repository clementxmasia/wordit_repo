import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public drivers: BehaviorSubject<String>;
  public _Url = "http://127.0.0.1:3000";

  constructor(
    private http: HttpClient,
  ) {
  }

  public add_sentence(sentence) {
    return this.http.post<any>(`${this._Url}/sentence/add`, { sentence });
  }

  public get_sentances(sentence) {
    return this.http.post<any>(`${this._Url}/sentence/suggestion`, { sentence });
  }

  public get_words() {
    return this.http.post<any>(`${this._Url}/word/all`, {});
  }

}
