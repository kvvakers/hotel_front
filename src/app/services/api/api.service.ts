import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected endpoint: string = "";
  protected url: string = `http://localhost:8080/api/`;
  protected headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer your-auth-token',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'GET, POST, OPTIONS'
    })
  constructor(protected httpClient: HttpClient) {

  }
}
