import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  public ID = new BehaviorSubject<string>(null);
  headers = { 'content-type': 'application/json' };
  model = '';
  constructor(private http: HttpClient) {}
  async update(url, data) {
    await this.http.put(url, data);
  }
  getAll(url: string) {
    const header = new HttpHeaders({
      Authorization:
        'Basic ' +
        btoa(
          sessionStorage.getItem('username') +
            ':' +
            sessionStorage.getItem('password')
        ),
    });
    return this.http.get(url, { headers: header });
  }
  get(id: string): Object {
    return this.http.get(id);
  }
  async create(url, data) {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization:
        'Basic ' +
        btoa(
          sessionStorage.getItem('username') +
            ':' +
            sessionStorage.getItem('password')
        ),
    });
    await this.http.post(url, body, { headers: headers }).toPromise();
  }
  async remove(url) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization:
        'Basic ' +
        btoa(
          sessionStorage.getItem('username') +
            ':' +
            sessionStorage.getItem('password')
        ),
    });
    await this.http
      .delete(url, {
        headers: headers,
      })
      .toPromise();
  }

  async sendFile(url, data) {
    // const body = JSON.stringify(data);
    const headers = new HttpHeaders({
      Authorization:
        'Basic ' +
        btoa(
          sessionStorage.getItem('username') +
            ':' +
            sessionStorage.getItem('password')
        ),
    });
    await this.http.post(url, data, { headers: headers }).toPromise();
  }
}
