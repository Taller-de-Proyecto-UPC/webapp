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
  BASE_URL = 'http://neuralscanstorage.ue.r.appspot.com/api/v1'
  constructor(private http: HttpClient) {}

  uploadFile(reportId: number, formData: FormData){
    // Aquí se realiza la solicitud POST para cargar el archivo al informe específico
    return this.http.post(`${this.BASE_URL}/report/${reportId}/upload`, formData);
  }

  createReport(doctorId: any, patientId: any, report: Report){
    console.log(`${this.BASE_URL}/report/`+"doctor/"+ doctorId+"/patient/"+patientId+"/create");

    this.http.post(`${this.BASE_URL}/report/`+"doctor/"+ doctorId+"/patient/"+patientId+"/create", report).subscribe(
      (response) => {
        console.log('El reporte se creo satisfactoriamente:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al crear el reporte', error);
      }
    );
  }

  updateReport(id: any, report: Report){
    this.http.put(`${this.BASE_URL}/report/`+ id, report).subscribe(
      (response: any) => {
        console.log('El Report se actualizo satisfactoriamente:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Error al actualizar el Report', error);
      }
    );
  }

  getFile(reportId: any): Observable<Blob> {
    console.log(`${this.BASE_URL}/report/download/${reportId}`)
    return this.http.get(`${this.BASE_URL}/report/download/${reportId}`, { responseType: 'blob' });
  }

  getAllReports(){
    return this.http.get<Report>(`${this.BASE_URL}/report`)
  }

  getReportsByPatientId(patientId: any): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.BASE_URL}/report/`+ "patient/"+patientId);
  }

  makePrediction(reportId: any) {
    return this.http.post(`http://127.0.0.1:5000/predict/${reportId}`, {});
  }
}
