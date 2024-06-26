import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';
import { Report } from 'src/app/interfaces/report';
import { Observable } from 'rxjs';
import { ReportCreateComponent } from '../report-create/report-create.component';
import { MatDialog } from '@angular/material/dialog';

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
  reportResponses: { [reportId: number]: string } = {};
  constructor(private route: ActivatedRoute, private reportService: ReportService, private dialog: MatDialog) {
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

  makePrediction(reportId: number) {
    this.reportService.makePrediction(reportId).subscribe((response: any) => {
      // Asigna la respuesta al informe correspondiente
      this.reportResponses[reportId] = response.result;
    });
  }
  openCreateDialog(patientId: string): void {
    const newReport = { id: patientId, summary: '', description: ''};
    const dialogRef = this.dialog.open(ReportCreateComponent, {
      width: '400px',
      data: newReport, // Pasa el objeto del nuevo doctor al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Manejar los datos del nuevo doctor si es necesario
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
