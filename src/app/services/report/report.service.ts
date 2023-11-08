import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'src/app/interfaces/report';
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
export class ReportService {


  BASE_URL = 'http://localhost:8080/api/v1'
  constructor(private http: HttpClient) {}

  uploadFile(reportId: number, formData: FormData){
    // Aquí se realiza la solicitud POST para cargar el archivo al informe específico
    return this.http.post(`${this.BASE_URL}/report/${reportId}/upload`, formData);
  }

  getFile(reportId: any): Observable<Blob> {
    console.log(`${this.BASE_URL}/report/download/${reportId}`)
    return this.http.get(`${this.BASE_URL}/report/download/${reportId}`, { responseType: 'blob' });
  }

  getAllReports(){
    return this.http.get<Report>(`${this.BASE_URL}/report`)
  }

  getReportsByPatientId(patientId: any): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.BASE_URL}/report/`+ patientId);
  }

  makePrediction(reportId: any) {
    return this.http.post(`http://127.0.0.1:5000/predict/${reportId}`, {});
  }
}
