import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorEditDialogComponent } from '../doctor-edit-dialog/doctor-edit-dialog.component';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-edit-dialog',
  templateUrl: './patient-edit-dialog.component.html',
  styleUrls: ['./patient-edit-dialog.component.css']
})
export class PatientEditDialogComponent {
  patientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PatientEditDialogComponent>,
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
    const updatedPatientData = this.patientForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.patientService.updatePatient(updatedPatientData.id,updatedPatientData);
    this.dialogRef.close(updatedPatientData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
