import { Component, OnInit } from '@angular/core';

import { Company } from './company.model';
import { CompanyService } from './company.service';
import { AlertService } from '../shared_services/alert.service';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyList: Company[];
  selectedCompany: Company;
  private editMode: boolean;

  constructor(
    private service: CompanyService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.updateList();
  }

  onSelectDetail(company:Company) : void {
    this.selectedCompany = company;
    this.editMode = true;
  }

  onSelectNew() : void {
    this.selectedCompany = Company.empty();
    this.editMode = false;
  }

  onSelectDelete(company: Company): void {
    this.selectedCompany = company;
    this.editMode = false;
  }

  onSave(): void {
    if(this.selectedCompany.name != null && this.selectedCompany.nit != null
      && this.selectedCompany.name != '' && this.selectedCompany.nit != ''){

        if (this.editMode) {
          this.service.update(this.selectedCompany).subscribe(
            company => {
              this.selectedCompany = null;
              this.updateList();
            },
            error => {
              this.alertService.error('Ocurrió un error actualizando la empresa');
              console.log("Error updating Company ::: ", error);
            }
          );
        } else {
          this.service.save(this.selectedCompany).subscribe(
            company => {
              this.selectedCompany = null;
              this.updateList();
            },
            error => {
              this.alertService.error('Ocurrió un error creando la empresa');
              console.log("Error saving Company ::: ", error);
            }
          );
        }
    }else{
      this.alertService.error('Todos los campos son obligatorios');
    }
  }

  onDelete(): void {
      this.service.delete(this.selectedCompany).subscribe(
        resp => {
          this.selectedCompany = null;
          this.updateList();
          this.alertService.success('Empresa eliminada correctamente');
        },
        error =>{
          if(error.status == 424) {
            this.alertService.warning('La empresa tiene dependencias que deben ser eliminadas primero');
          }else {
            this.alertService.error('Ocurrió un error eliminando la empresa');
            console.log("Error deleting Company ::: ", error);
          }
        }
      );
  }

  private updateList(): void {
    this.alertService.clear();
    this.service.list().subscribe(
      companies => {
        this.companyList = companies;
      },
      error => {
        this.alertService.error('Ocurrió un error listando las empresas');
        console.log("Error listing Companies ::: ", error);
      }
    );
  }
}
