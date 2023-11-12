import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-create-dialog',
  templateUrl: './doctor-create-dialog.component.html',
  styleUrls: ['./doctor-create-dialog.component.css']
})
export class DoctorCreateDialogComponent {
  doctorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DoctorCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {
    this.doctorForm = this.fb.group({
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
  }

  save() {
    const newDoctorData = this.doctorForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.doctorService.createDoctor(1,newDoctorData);
    this.dialogRef.close(newDoctorData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
