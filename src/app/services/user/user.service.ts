import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';

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

  BASE_URL = 'https://neuralscanstorage.ue.r.appspot.com/api/v1'
  constructor(private http: HttpClient) {}


  private userTypeKey = 'userType';
  private id = 'userId';
  private username = 'username';

  saveUserType(userType: string): void {
    localStorage.setItem(this.userTypeKey, userType);
  }

  saveId(id: string): void {
    localStorage.setItem(this.id, id);
  }

  getId(): string | null {
    return localStorage.getItem(this.id);
  }

  saveUsername(username: string): void {
    localStorage.setItem(this.username, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.username);
  }


  getUserType(): string | null {
    return localStorage.getItem(this.userTypeKey);
  }

  clearUserType(): void {
    localStorage.removeItem(this.userTypeKey);
  }

  getAllUsers(){
    return this.http.get<User>(`${this.BASE_URL}/user`)
  }
  //GET patient by email
  getUser(login: Login):Observable<Login>{
    return this.http.post<Login>(`${this.BASE_URL}/user/login`, login)
  }

  createUser(user: User){
    console.log(`${this.BASE_URL}`+"/user/create");

    this.http.post(`${this.BASE_URL}`+"/user/create", user).subscribe(
      (response: any) => {
        console.log('El usuario se creo satisfactoriamente:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }

  updateUser(id: any, user: User){
    this.http.put(`${this.BASE_URL}/user/`+ id, user).subscribe(
      (response: any) => {
        console.log('El user se actualizo satisfactoriamente:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Error al actualizar el user', error);
      }
    );
  }



}
