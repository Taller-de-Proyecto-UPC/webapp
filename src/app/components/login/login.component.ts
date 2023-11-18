import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedUserType: string = '';

  mylogin : Login = {
    password:'',
    email: '',
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modal: NgbModal,
    private dialog: MatDialog
  ) {}
  
  selectUserType(userType: string) {
    this.selectedUserType = userType;
  }
  
  isValidEmail(): boolean {
    if (this.mylogin.email !== undefined && this.mylogin.email !== null) {
      return this.mylogin.email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}') !== null;
    }
    return false;
  }

  submitLogin() {
    if (!this.mylogin.email || !this.mylogin.email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')) {
      console.log('Correo electrónico no válido. No se enviará la solicitud.');
      return;
    }

    if (this.selectedUserType === 'admin') {
      this.loginService.getAdminbyEmail(this.mylogin)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.email == this.mylogin.email && res.password == this.mylogin.password) {
              console.log("login successfully");
              this.loginService.saveUserType('admin');
              this.router.navigate(['/admin-dashboard']);
            } else {
              console.log("incorrect credentials");
            }
          },
          error: (err) => {
            console.log(err);
            this.openDialog("Credenciales incorrectas. Por favor, revise sus credenciales")
          }
        });
    } else if (this.selectedUserType === 'doctor'){
      this.loginService.getDoctorbyEmail(this.mylogin)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.email == this.mylogin.email && res.password == this.mylogin.password) {
              console.log("login successfully");
              this.loginService.saveUserType('doctor');
              this.router.navigate(['/doctor-dashboard']);
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
  }
  

  login() {
    console.log(this.mylogin.email);
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

