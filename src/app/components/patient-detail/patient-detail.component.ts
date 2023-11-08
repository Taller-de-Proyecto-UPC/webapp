import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';
import { Report } from 'src/app/interfaces/report';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit{
  patientId: string; // Declara una propiedad para almacenar el ID del paciente
  reports: Report[] = [];
  selectedFile: File | null = null;
  imageBaseUrl = 'assets/upload/';
  responseFromServer: string;

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.patientId = '';
    this.responseFromServer = '';
   }

  ngOnInit(): void {
    // Dentro del método ngOnInit, puedes acceder al valor del parámetro 'id' usando ActivatedRoute
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.patientId = id;
        this.loadReports(id);
      }
      console.log(this.patientId)
    });

  }

  getReportImage(reportId: number): string {
    return `${this.imageBaseUrl}${reportId}.jpg`;
  }
  
  

  loadReports(patientId: string) {
    this.reportService.getReportsByPatientId(patientId).subscribe(reports => {
      this.reports = reports;
    });
  }


  onFileChange(event: any, reportId: number) {
    const file = event.target.files[0];
    // Puedes guardar el archivo en una propiedad del componente si es necesario.
    this.selectedFile = file;
  }

  makePrediction(reportId: any) {
    this.reportService.makePrediction(reportId).subscribe((response: any) => {
      // Manejar la respuesta de la predicción aquí
      this.responseFromServer = response.result;
    });
  }
  
  uploadFile(reportId: number) {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado un archivo.');
      return;
    }
  
    const formData = new FormData();
    formData.append('files', this.selectedFile);
  
    this.reportService.uploadFile(reportId, formData).subscribe(
      (response) => {
        console.log('Archivo subido con éxito', response);
        // Realiza acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al cargar el archivo', error);
      }
    );
  }

  
}
