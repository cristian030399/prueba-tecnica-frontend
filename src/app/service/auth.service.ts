import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  auth(user: any):Observable<any> {
    return this.http.post(`${this.API}/login`, user);
  }

  logout():Observable<any> {
    return this.http.get(`${this.API}/logout`);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.clear();
  }

  isLogged() {
    return localStorage.getItem("token") != null
  }
}
