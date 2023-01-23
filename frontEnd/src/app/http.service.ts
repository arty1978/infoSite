import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly url = 'http://localhost:3900';
  private httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders(),
  };

  constructor(private httpClient: HttpClient) {
    this.setToken();
  }
  setToken() {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type',
      'application/json'
    );

    const token = localStorage.getItem('token');
    if (token) {
      this.httpOptions.headers = this.httpOptions.headers.set('token', token);
    }
  }

  get<T>(route: string) {
    console.log(this.httpOptions);
    return this.httpClient.get<T>(`${this.url}/${route}`, this.httpOptions);
  }

  post<T>(route: string, body: any) {
    return this.httpClient.post<T>(
      `${this.url}/${route}`,
      body,
      this.httpOptions
    );
  }

  put<T>(route: string, body: any) {
    return this.httpClient.put<T>(
      `${this.url}/${route}`,
      body,
      this.httpOptions
    );
  }

  delete<T>(route: string) {
    return this.httpClient.delete<T>(`${this.url}/${route}`, this.httpOptions);
  }
}
