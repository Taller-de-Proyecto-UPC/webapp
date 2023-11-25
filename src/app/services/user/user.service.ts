import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/interfaces/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) {}


  private userTypeKey = 'userType';

  saveUserType(userType: string): void {
    localStorage.setItem(this.userTypeKey, userType);
  }

  getUserType(): string | null {
    return localStorage.getItem(this.userTypeKey);
  }

  clearUserType(): void {
    localStorage.removeItem(this.userTypeKey);
  }
  //GET patient by email
  getUser(login: Login):Observable<Login>{
    return this.http.post<Login>(`${this.BASE_URL}/user/login`, login)
  }

  //GET psychologist by email
  getDoctorbyEmail(login: Login):Observable<Login>{
    return this.http.post<Login>(`${this.BASE_URL}/doctor/login`, login)
  }

}
