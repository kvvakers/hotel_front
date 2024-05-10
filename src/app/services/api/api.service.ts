import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected endpoint: string = "";
  protected url: string = `http://localhost:8080/api/`;
  protected headers: HttpHeaders | undefined = undefined;
  constructor(protected httpClient: HttpClient) {
    this.headers = this.getHeaders();
  }

  getHeaders(): HttpHeaders {
    const token : string | null = localStorage.getItem("access_token");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token != null ? token : '',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-type, Authorization',
    });
  }
}
