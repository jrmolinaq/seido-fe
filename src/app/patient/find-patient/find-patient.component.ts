import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Patient } from '../patient.model';
import { PatientService } from '../patient.service';
import { AlertService } from '../../shared_services/alert.service';
import { AuthenticationService } from '../../shared_services/authentication.service';

//import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-find-patient',
  templateUrl: './find-patient.component.html',
  styleUrls: ['./find-patient.component.css']
})

export class FindPatientComponent implements OnInit {
  
  patientList: Patient[] = [];
  selectedPatient: Patient;
  private editMode: boolean;

  constructor(
    private service: PatientService,
    private router: Router,
    private alertService: AlertService,
    public auth: AuthenticationService) { }

  ngOnInit() {
  }

  onSelectDetail(patient: Patient): void {
    this.selectedPatient = patient;
    this.editMode = true;
  }

  onSelectNew(): void {
    this.selectedPatient = Patient.empty();
    this.editMode = false;
  }
  
  onSelectDelete(patient: Patient): void {
    this.selectedPatient = patient;
    this.editMode = false;
  }

  onSave(): void {
    if(this.selectedPatient.firstName != null && this.selectedPatient.firstName != '' &&
      this.selectedPatient.lastName != null && this.selectedPatient.lastName != '' &&
      this.selectedPatient.nuip != null && this.selectedPatient.nuip != ''){

        if (this.editMode) {

            this.service.update(this.selectedPatient).subscribe(
              patient => {
                this.selectedPatient = null;
                this.patientList = [];
              },
              error => {
                this.alertService.error('Ocurrió un error actualizando el paciente');
                console.log("Error updating Patient ::: ", error);
              }
            );
        } else {

          this.service.save(this.selectedPatient).subscribe(
            patient => {
              this.selectedPatient = null;
              this.patientList = [];
              this.router.navigate(['/patient', patient.id, 'event'])
              .catch(error => console.log('Error redirectign to event page'));
            },
            error => {
              this.alertService.error('El paciente ya existe');
              console.log("el paciente ya existe ::: ", error);
            }
          );
        }
    }else{
      this.alertService.error('Todos los campos son obligatorios');
    }
  }

  onDelete(patient: Patient) :void {
    this.service.delete(this.selectedPatient).subscribe(
      resp => {
        this.selectedPatient = null;
        this.patientList = [];
        this.alertService.success('Paciente eliminado correctamente');
      },
      error => {
        this.alertService.error('Ocurrió un error eliminando el paciente');
        console.log("Error deleting Patient ::: ", error);
      }
    );
  }

  search(searchTerm: string){
    this.alertService.clear();
    if (searchTerm) {
      this.service.search(searchTerm).subscribe(
        resp => {
         this.patientList = [resp];
        },
        error => {
          if(error.status == 404){
            this.patientList = [];
            this.alertService.info('No se encontró ningún paciente');
          }else{
            this.alertService.error('Ocurrió un error haciendo la busqueda');
            console.log("Error searching Patients ::: ", error);
          }
        }
      );
    } else {
      this.patientList = [];
    }
  }

}
