
import { EnvironmentInjector, Injectable, LOCALE_ID } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/login';
import { environment } from 'src/environment/environment';

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

export class LoginService {
  BASE_URL = 'http://neuralscanstorage.ue.r.appspot.com/api/v1'
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
    getAdminbyEmail(login: Login):Observable<Login>{
      return this.http.post<Login>(`${this.BASE_URL}/administrator/login`, login)
    }

    //GET psychologist by email
    getDoctorbyEmail(login: Login):Observable<Login>{
      return this.http.post<Login>(`${this.BASE_URL}/doctor/login`, login)
    }

}