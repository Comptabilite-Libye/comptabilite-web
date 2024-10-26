import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
// Make sure to replace 'YOUR_API_KEY' with your actual API key 
const API_KEY = 'db6fab4d2ff2e4ccc9eb2ace'; 
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
  constructor(private http: HttpClient) {}

  getLYDExchangeRates(): Observable<any> {
    const url = `${BASE_URL}${API_KEY}/latest/LYD`;
    return this.http.get(url); 
  }
}