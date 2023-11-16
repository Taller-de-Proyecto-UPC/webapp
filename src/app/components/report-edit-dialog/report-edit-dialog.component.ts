import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorEditDialogComponent } from '../doctor-edit-dialog/doctor-edit-dialog.component';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report-edit-dialog',
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.css']
})
export class ReportEditDialogComponent {
  reportForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ReportEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportService: ReportService
  ) {
    this.reportForm = this.fb.group({
      id: data.id,
      summary: data.summary,
      description: data.description,
      comment: data.comment,
    });
  }

  isEditable(): boolean {
    return !(this.data.description === 'Tiene aneurisma' || this.data.description === 'No tiene aneurisma');
  }


  save() {
    const updatedReportData = this.reportForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.reportService.updateReport(updatedReportData.id,updatedReportData);
    this.dialogRef.close(updatedReportData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
