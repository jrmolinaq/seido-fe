import { Component, OnInit } from '@angular/core';

import { Control6 } from './control6.model';
import { Control6Service } from './control6.service';
import { AlertService } from './../../shared_services/alert.service';

@Component({
  selector: 'app-control6',
  templateUrl: './control6.component.html',
  styleUrls: ['./control6.component.css']
})
export class Control6Component implements OnInit {
  controlList: Control6[];

  constructor(
    private controlService: Control6Service,
    private alertService: AlertService) { }

  ngOnInit() {
    this.updateList();
  }
  
  downloadControl6Meses() {
    this.alertService.clear();
    this.controlService.downloadControl6Meses().subscribe(
      resp => {
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(resp);
        a.download = "Listado 6 meses " + new Date().toLocaleString() + "].xlsx";
        a.click();
      },
      error => {
        this.alertService.error('Ocurrió un error generando el archivo excel de control 6 meses');
        console.log("Error in downloadControl6Meses ::: ", error);
      }
    );
  }

  private updateList(): void {
    this.alertService.clear();
    this.controlService.list().subscribe(
      controls => {
        this.controlList = controls;
      },
      error => {
        this.alertService.error('Ocurrió un error listando los pacientes para control de 6 meses');
        console.log("Error listing Control6 ::: ", error);
      }
    );
  }
}
