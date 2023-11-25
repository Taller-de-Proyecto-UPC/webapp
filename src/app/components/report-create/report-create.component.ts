import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';
import { Report } from 'src/app/interfaces/report';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent {
  reportForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ReportCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportService: ReportService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute
  ) {
    this.reportForm = this.fb.group({
      id: [data?.id || null, Validators.required],
      summary: [data?.summary || null, Validators.required],
      description: [data?.description || null, Validators.required],
      comment: [data?.comment || null, Validators.required],
    });
  }

  isNotEmpty(value: string | null): boolean {
    // Verifica si el valor es null o undefined antes de intentar realizar la operación trim
    return value !== null && value !== undefined && value.trim() !== '';
  }

  save() {

    if (
      this.isNotEmpty(this.reportForm.value.summary) &&
      this.isNotEmpty(this.reportForm.value.description)
    ) {
      const newReportData: Report = {
        id: "0",
        summary: this.reportForm.value.summary,
        description: this.reportForm.value.description,
        comment: this.reportForm.value.comment,  // Agrega el campo 'comment'
        image: {
          path: '',
          added: '' // Ajusta según la estructura de tu formulario
        }
      };

      console.log(this.reportForm.value.id)
      console.log(this.doctorService.getDoctorId())

      // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
      this.reportService.createReport(this.doctorService.getDoctorId(),this.reportForm.value.id, newReportData);
      this.dialogRef.close(newReportData);
    } else {
      // Muestra un mensaje de error si algún campo está vacío
      // alert('Por favor, completa todos los campos.');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
}
