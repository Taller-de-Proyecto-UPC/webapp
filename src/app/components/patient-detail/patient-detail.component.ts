import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';
import { Report } from 'src/app/interfaces/report';
import { concatMap, from, Observable } from 'rxjs';
import { ReportCreateComponent } from '../report-create/report-create.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportEditDialogComponent } from '../report-edit-dialog/report-edit-dialog.component';
import { LoginService } from 'src/app/services/login/login.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from 'src/app/services/image/image.service';
import { Image } from 'src/app/interfaces/image';
//import {ref, Storage } from "@angular/fire/storage";
import {ref, getStorage } from "firebase/storage";



@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit{
  patientId: string; // Declara una propiedad para almacenar el ID del paciente
  patientName: string;
  reports: Report[] = [];
  selectedFile: File | null = null;
  imageBaseUrl = 'assets/upload/';
  responseFromServer: string;
  searchTerm: string = '';

  reportResponses: { [reportId: number]: string } = {};
  constructor(private fireStorage:AngularFireStorage, private route: ActivatedRoute, private imageService: ImageService, private reportService: ReportService, private dialog: MatDialog, private userService: UserService, private patientService: PatientService) {
    this.patientId = '';
    this.patientName = '';
    this.responseFromServer = '';
   }

  ngOnInit(): void {
    // Dentro del método ngOnInit, puedes acceder al valor del parámetro 'id' usando ActivatedRoute
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.patientId = id;
        console.log(this.userService.getUserType())
        this.loadReports(id);
      }
      console.log(this.patientId)
    })
    this.patientName = this.patientService.getName() ?? ''; // Asigna '' si el nombre es null
  }
  
  filteredReports(): any[] {
    return this.reports.filter((report: { summary: string; }) =>
    report.summary.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isNotUserAdmin(): boolean {
    console.log(this.userService.getUserType())
    return this.userService.getUserType() == 'admin';
  }
  
  getReportImage(report: any): string {
    if (report.image && report.image.path && report.image.path != "C:/Users/stefa/OneDrive/Escritorio/TP1/Frontend/webapp/src/assets/upload") {
      return report.image.path;
    } else {
      return "../assets/upload/neuralscan.jpg";
    }

  }
  

  loadPatientName(): void {
    this.patientName = this.patientService.getName() ?? ''; // Asigna '' si el nombre es null
  }

  isSummaryEditable(summary: string): boolean {
    console.log('Summary:', summary);
    
    console.log(summary === 'Tiene aneurisma' || summary === 'No tiene aneurisma');

    return summary === 'Tiene aneurisma' || summary === 'No tiene aneurisma';
  }

  openEditDialog(report: any): void {
    const dialogRef = this.dialog.open(ReportEditDialogComponent, {
      width: '400px',
      data: report, // Pasa el doctor seleccionado al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }


  editReport(reportId: number): string {
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

  uploadFile(report: any, reportId: number) {
    if (!this.selectedFile) {
        console.error('No se ha seleccionado un archivo.');
        return;
    }

    const path = `storage/${reportId}`;
    const uploadTask$ = from(this.fireStorage.upload(path, this.selectedFile));
    const url$ = uploadTask$.pipe(
        concatMap(uploadTask => from(uploadTask.ref.getDownloadURL()))
    );

    url$.subscribe(
        (url: string) => {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
            console.log(url)
            const newImageData: Image = {
                id: report.id,
                path: url,
                added: `${formattedDate} ${formattedTime}`
            };

            console.log(newImageData);

            // Envía los datos actualizados al servidor o realiza la edición
            this.imageService.updateImage(report.id, newImageData);
            setTimeout(() => {
              console.log("Espera de 2 segundos completada");
              location.reload();
            }, 2000);

        }
    );
  }

  makePrediction(report: any) {
    this.reportService.makePrediction(report.image.path).subscribe((response: any) => {
        // Asigna la respuesta al informe correspondiente
        report.description = response.result;

        // Actualiza el informe después de la predicción
        this.reportService.updateReport(report.id, report);

        // Recarga la página
        setTimeout(() => {
          console.log("Espera de 2 segundos completada");
          //location.reload();
        }, 2000);
    });
}

  openCreateDialog(patientId: string): void {
    const newReport = { id: patientId, summary: '', description: '', comment: ''};
    const dialogRef = this.dialog.open(ReportCreateComponent, {
      width: '400px',
      data: newReport, // Pasa el objeto del nuevo doctor al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Manejar los datos del nuevo doctor si es necesario
    });
  }



  
}
