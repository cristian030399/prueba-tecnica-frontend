import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API = 'http://127.0.0.1:8000/api/product'

  constructor(private http: HttpClient) { }

  register(data:any) {
    return this.http.post(this.API, data);
  }

  getAll() {
    return this.http.get(this.API);
  }

  get(id:any) {
    return this.http.get(`${this.API}/${id}`);
  }

  update(id:any, data:any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  delete(id:any) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
