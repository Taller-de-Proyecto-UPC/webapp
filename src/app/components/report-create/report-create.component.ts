import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';

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
    private reportService: ReportService
  ) {
    this.reportForm = this.fb.group({
      id: [data?.id || null, Validators.required],
      summary: [data?.summary || null, Validators.required],
      description: [data?.description || null, Validators.required],
    });
  }

  isNotEmpty(value: string | null): boolean {
    // Verifica si el valor es null o undefined antes de intentar realizar la operación trim
    return value !== null && value !== undefined && value.trim() !== '';
  }

  isValidEmail(email: string): boolean {
    // Utilizamos una expresión regular simple para verificar la validez del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  save() {
    if (
      this.isNotEmpty(this.reportForm.value.summary) &&
      this.isNotEmpty(this.reportForm.value.description)
    ) {
    const newReportData = this.reportForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.reportService.createReport(this.data.id,newReportData);
    this.dialogRef.close(newReportData);
    } else{}
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
