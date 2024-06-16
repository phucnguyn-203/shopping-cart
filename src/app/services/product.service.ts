import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getAllProducts(filter: string): Observable<Product[]> {
    if (filter === 'all') return this.http.get<Product[]>(this.url);
    return this.http.get<Product[]>(this.url, { params: { category: filter } });
  }

  getProductBySlug(slug: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { params: { slug } });
  }
  getFeturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { params: { _limit: '8' } });
  }
}
