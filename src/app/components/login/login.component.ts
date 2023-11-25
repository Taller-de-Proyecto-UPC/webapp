import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { Doctor } from 'src/app/interfaces/doctor';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedUserType: string = '';
  doctor: any;
  mylogin : Login = {
    id: '',
    password:'',
    username: '',
    role: ''
  };

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private router: Router,
    private modal: NgbModal,
    private dialog: MatDialog
  ) {}
  
  selectUserType(userType: string) {
    this.selectedUserType = userType;
  }
  

  submitLogin() {
    this.userService.getUser(this.mylogin)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.username == this.mylogin.username && res.password == this.mylogin.password) {
            console.log("login successfully");
            console.log(res.id);

            this.userService.saveId(res.id);
            this.userService.saveUserType(res.role);
            this.userService.saveUsername(res.username);

            if(res.role == "admin"){
              this.router.navigate(['/admin-dashboard']);
            }
            else
            {
              this.doctorService.getDoctorByUsername(res.username)
              .subscribe(doctor => {
                console.log(doctor.doctorId);

                this.doctorService.saveDoctorId(doctor.doctorId);
                this.router.navigate(['/doctor-dashboard']);
              }, error => {
                console.error('Error al obtener el doctor por username', error);
                // Manejar errores aquí, por ejemplo, mostrar un mensaje de error
              });
            }
          } else {
            console.log("incorrect credentials");
          }
        },
        error: (err) => {
          console.log(err);
          this.openDialog("Credenciales incorrectas. Por favor, revise sus credenciales")
        }
      });
  }
  

  login() {
    console.log(this.mylogin.username);
    console.log(this.mylogin.password);
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

