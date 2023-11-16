import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      id: data.id,
      summary: data.name,
      description: data.lastName,
    });
  }

  save() {
    const newReportData = this.reportForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.reportService.createReport(this.data.id,newReportData);
    this.dialogRef.close(newReportData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
