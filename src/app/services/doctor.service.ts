import { EnvironmentInjector, Injectable, LOCALE_ID } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { throwError,catchError} from 'rxjs';
import { Doctor } from '../interfaces/doctor';

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
export class DoctorService {

  BASE_URL = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) {}

  getAllDoctors(){
    return this.http.get<Doctor>(`${this.BASE_URL}/doctor`)
  }

  updateDoctor(id: any, doctor: Doctor){
    this.http.put(`${this.BASE_URL}/doctor/`+ id, doctor).subscribe(
      (response) => {
        console.log('El doctor se actualizo satisfactoriamente:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al actualizar el doctor', error);
      }
    );
  }

  deleteDoctor(id: any){
    this.http.delete(`${this.BASE_URL}/doctor/`+ id).subscribe(
      (response) => {
        console.log('El doctor se borro satisfactoriamente:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al borrar el doctor', error);
      }
    );
  }


}


