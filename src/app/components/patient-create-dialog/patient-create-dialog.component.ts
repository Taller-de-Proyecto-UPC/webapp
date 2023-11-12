import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorCreateDialogComponent } from '../doctor-create-dialog/doctor-create-dialog.component';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-create-dialog',
  templateUrl: './patient-create-dialog.component.html',
  styleUrls: ['./patient-create-dialog.component.css']
})
export class PatientCreateDialogComponent {
  patientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DoctorCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
    });
  }

  save() {
    const newPatientData = this.patientForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.patientService.createPatient(1,newPatientData);
    this.dialogRef.close(newPatientData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
