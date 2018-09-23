import { Component, OnInit } from '@angular/core';

import { Specialty } from './specialty.model';
import { Company } from './../company/company.model';
import { SpecialtyService } from './specialty.service';
import { AlertService } from '../shared_services/alert.service';
import { AuthenticationService } from '../shared_services/authentication.service';
import { CompanyService } from '../company/company.service';

//import { Observable, Subscription } from 'rxjs/Rx';
 
@Component({
  selector: 'specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})

export class SpecialtyComponent implements OnInit {
  specialtyList: Specialty[];
  companyList: Company[] = [];
  selectedSpecialty: Specialty;
  editMode: boolean;

  constructor(
    public auth: AuthenticationService,
    private service: SpecialtyService,
    private companyService: CompanyService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.updateList();

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

  onSelectDetail(specialty: Specialty): void {
    this.selectedSpecialty = specialty;
    this.editMode = true;
  }

  onSelectNew(): void {
    this.selectedSpecialty = Specialty.empty();
    this.editMode = false;
  }
  
  onSelectDelete(specialty: Specialty): void {
    this.selectedSpecialty = specialty;
    this.editMode = false;
  }

  onSave(): void {
    if(this.selectedSpecialty.name != null && this.selectedSpecialty.name != '' &&
        this.selectedSpecialty.company != null && this.selectedSpecialty.company.id != 0){

      if (this.editMode) {
        
        this.service.update(this.selectedSpecialty).subscribe(
          specialty => {
            this.selectedSpecialty = null;
            this.updateList();
          },
          error => {
            this.alertService.error('Ocurrió un error actualizando la especialidad');
            console.log("Error updating Specialty ::: ", error);
          }
        );
      } else {

        this.service.save(this.selectedSpecialty).subscribe(
          specialty => {
            this.selectedSpecialty = null;
            this.updateList();
          },
          error => {
            this.alertService.error('Ocurrió un error creando la especialidad');
            console.log("Error saving Specialty ::: ", error);
          }
        );
      }
    }else{
      if(this.auth.isCurrentUserRoot){
        this.alertService.error('El nombre y la empresa son obligatorias');
      }else{
        this.alertService.error('El nombre es obligatorio');
      }
    }
  }

  onDelete(specialty: Specialty): void {
    this.service.delete(this.selectedSpecialty).subscribe(
      resp => {
        this.selectedSpecialty = null;
        this.updateList();
        this.alertService.success('Especialidad eliminada correctamente');
      },
      error => {
        if(error.status == 424) {
          this.alertService.warning('La especialidad tiene dependencias que deben ser eliminadas primero');
        }else {
          this.alertService.error('Ocurrió un error eliminando la especialidad');
          console.log("Error deleting Specialty ::: ", error);
        }
      }
    );
  }

  private updateList(): void {
    this.alertService.clear();
    this.service.list().subscribe(
      specialties => {
        this.specialtyList = specialties;
      },
      error => {
        this.alertService.error('Ocurrió un error listando las especialidades');
        console.log("Error listing Specialties ::: ", error);
      }
    );
  }

}
