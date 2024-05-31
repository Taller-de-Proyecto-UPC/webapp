import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';

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
export class PatientService {

  BASE_URL = 'https://tough-country-423601-c7.rj.r.appspot.com/api/v1'
  private patientName = 'name';

  constructor(private http: HttpClient) {}

  getAllPatients(){
    return this.http.get<Patient>(`${this.BASE_URL}/patient`)
  }

  saveName(name: string, lastName: string): void {
    localStorage.setItem(this.patientName, name+" "+lastName);
  }

  getName(): string | null {
    return localStorage.getItem(this.patientName);
  }


  getPatientByDNI(dni: any){
    return this.http.get<Patient>(`${this.BASE_URL}/patient/dni/`+dni)
  }

  updatePatient(id: any, patient: Patient){
    this.http.put(`${this.BASE_URL}/patient/`+ id, patient).subscribe(
      (response: any) => {
        console.log('El Patient se actualizo satisfactoriamente:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Error al actualizar el Patient', error);
      }
    );
  }

  createPatient(id: any, patient: Patient){
    this.http.post(`${this.BASE_URL}/patient/`+ id+"/create", patient).subscribe(
      (response: any) => {
        console.log('El paciente se creo satisfactoriamente:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Error al crear el paciente', error);
      }
    );
  }

  deletePatient(id: any){
    this.http.delete(`${this.BASE_URL}/patient/`+ id).subscribe(
      (response: any) => {
        console.log('El patient se borro satisfactoriamente:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Error al borrar el patient', error);
      }
    );
  }
}
