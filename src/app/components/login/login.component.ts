import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  mylogin : Login = {
    password:'',
    email: '',
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modal: NgbModal,
  ) {}
  

  submitLogin(){
    this.loginService.getAdminbyEmail(this.mylogin) // Cambiar "login" al nombre adecuado de tu método en el servicio
    .subscribe({
      next: (res) => {
        console.log(res);
        if (res.email == this.mylogin.email && res.password == this.mylogin.password) {
          console.log("login successfully");
        } else {
          alert("incorrect credentials");
        }
      },
      error: (err) => {
        console.log(err);
        alert("Error en el inicio de sesión. Por favor, inténtalo de nuevo.");
      }
    });

  }

  login() {
    console.log(this.mylogin.email);
    console.log(this.mylogin.password);
  }
}
