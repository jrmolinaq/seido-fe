import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { Company } from '../../company/company.model';
import { UserService } from '../user.service';
import { CompanyService } from '../../company/company.service';
import { AlertService } from '../../shared_services/alert.service';
import { AuthenticationService } from '../../shared_services/authentication.service';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.css']
})

export class FindUserComponent implements OnInit {
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
  
  onSelectDetail(user: User): void {
    this.selectedUser = user;
    this.editMode = true;
  }

  onSelectNew(): void {
    this.selectedUser = User.empty();
    this.editMode = false;
  }
  
  onSelectDelete(user: User): void {
    this.selectedUser = user;
    this.editMode = false;
  }
  
  onSelectPassword(user: User): void {
    this.selectedUser = user;
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
  
  onChangePass(): void {
    if(this.selectedUser.password != null && this.selectedUser.password != '' ){

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
    }else{
      this.alertService.error('El campo de contraseña es obligatorio');
    }
  }
  
  onDelete(user: User) :void {
    this.service.delete(this.selectedUser).subscribe(
      resp => {
        this.selectedUser = null;
        this.userList = [];
        this.alertService.success('Usuario eliminado correctamente');
      },
      error => {
        if(error.status == 409) {
          this.alertService.warning('No es posible eliminar su mismo usuario');
        }else {
          this.alertService.error('Ocurrió un error eliminando el usuario');
          console.log("Error deleting User ::: ", error);
        }
      }
    );
  }
  
  search(searchTerm: string){
    this.alertService.clear();
    if (searchTerm) {
      this.service.search(searchTerm).subscribe(
        resp => {
          this.userList = [resp];
        },
        error => {
          if(error.status == 404){
            this.userList = [];
            this.alertService.info('No se encontró ningún usuario');
          }else{
            this.userList = [];
            this.alertService.error('Ocurrió un error haciendo la busqueda');
            console.log("Error searching Users ::: ", error);
          }
        }
      );
    } else {
      this.userList = [];
    }
  }

}
