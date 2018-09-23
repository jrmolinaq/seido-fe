import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { Company } from '../../company/company.model';
import { UserService } from '../user.service';
import { CompanyService } from '../../company/company.service';
import { AlertService } from '../../shared_services/alert.service';
import { AuthenticationService } from '../../shared_services/authentication.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent implements OnInit {
  userList: User[] = [];
  companyList: Company[] = [];
  selectedUser: User;
  editMode: boolean;

  constructor(
    private service: UserService,
    private companyService: CompanyService,
    private router: Router,
    private alertService: AlertService,
    public auth: AuthenticationService) { }

  ngOnInit() {
    this.companyService.list().subscribe(
      companies => {
        this.companyList = companies;
      },
      error => {
        this.alertService.error('Ocurrió un error listando las empresas');
        console.log("Error listing Companies in UserComponet::: ", error);
      }
    );
  }
  
  onSelectNew(): void {
    this.selectedUser = User.empty();
    this.editMode = false;
  }
  
  onSave(): void {
    if (localStorage.getItem('currentUser')) {
      let logedUser = JSON.parse(localStorage.getItem('currentUser'));

      if(logedUser.role == "ROLE_ADMIN" && !this.editMode){
        this.selectedUser.authority.name = "ROLE_OPERATOR";
        this.selectedUser.company.id = logedUser.companyid;
      }
    }

    if(this.selectedUser.username != null && this.selectedUser.username != '' &&
      this.selectedUser.password != null && this.selectedUser.password != '' &&
      this.selectedUser.firstname != null && this.selectedUser.firstname != '' &&
      this.selectedUser.lastname != null && this.selectedUser.lastname != '' &&
      this.selectedUser.authority.name != null &&
      this.selectedUser.company.id != null){

        if(this.selectedUser.authority.name == 'ROLE_ROOT'){
          this.selectedUser.authority.id = 1;
        }else if(this.selectedUser.authority.name == 'ROLE_ADMIN'){
          this.selectedUser.authority.id = 2;
        }else{
          this.selectedUser.authority.id = 3;
        }

        if (this.editMode) {

            this.service.update(this.selectedUser).subscribe(
              user => {
                this.selectedUser = null;
                this.userList = [];
              },
              error => {
                this.alertService.error('Ocurrió un error actualizando el usuario');
                console.log("Error updating User ::: ", error);
              }
            );
        } else {

          this.service.save(this.selectedUser).subscribe(
            user => {
              this.selectedUser = null;
              this.userList = [];
            },
            error => {
              this.alertService.error('El usuario ya existe');
              console.log("El usuario ya existe ::: ", error);
            }
          );
        }
    }else{
      this.alertService.error('Todos los campos son obligatorios');
    }
  }

}
