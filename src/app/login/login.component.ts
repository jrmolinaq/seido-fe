import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../shared_services/alert.service';
import { AuthenticationService } from '../shared_services/authentication.service';
import { HeaderComponent } from '../shared_components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.returnUrl = '/';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {

                    if (localStorage.getItem('currentUser')) {

                        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

                        if(currentUser.role == 'ROLE_ROOT'){
                            this.returnUrl = 'company';
                        }else if(currentUser.role == 'ROLE_ADMIN' || currentUser.role == 'ROLE_OPERATOR'){
                            this.returnUrl = 'patient';
                        }
                    }
                    
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    let message = "Ocurrió un error al autenticarse";
                    let exception = error.error.exception;
                    
                    if(exception.indexOf("BadCredentialsException") != "-1"){
                        message = "El usuario y/o contraseña son incorrectos";
                    }
                    else if (exception.indexOf("DisabledException") != "-1"){
                        message = "El usuario está deshabilitado";
                    }

                    this.alertService.error(message);
                    this.loading = false;
                });
    }
}
