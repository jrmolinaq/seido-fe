import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { Patient } from '../patient/patient.model';
import { Specialty } from '../specialty/specialty.model';
import { Survey } from '../survey/survey.model';
import { Event } from './event.model';

import { PatientService } from '../patient/patient.service';
import { EventService } from './event.service';
import { SurveyService } from '../survey/survey.service';
import { AlertService } from '../shared_services/alert.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  patient: Patient;
  filteredEvents: Event[];
  newEvent: Event;
  selectedSpecialty: Specialty;
  private surveys: Survey[];
  specialties: Specialty[];
  private filteredBasicSurveys: Survey[];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private eventService: EventService,
    private surveyService: SurveyService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let patientId = params['patientId'];
        this.buildPatientInfo(patientId);
        this.buildSurveysInfo(patientId);
      }
    );
  }

  private buildPatientInfo(patientId: number): void {
    this.patientService.find(patientId).subscribe(
      patient => {
        this.patient = patient;
      },
      error => {
        this.alertService.error('Ocurrió un error encontrando el paciente');
        console.log("Error finding patient ::: ", error);
      }
    );
  }

  private buildSurveysInfo(patientId: number): void {
    this.surveyService.list(patientId).subscribe(
      surveys => {
        this.surveys = surveys;
        this.buildSpecialtyInfo(surveys);
        this.filteredBasicSurveys = this.buildFilteredBasicSurveys(surveys);
        this.filteredEvents = this.buildFilteredEvents(surveys);
      },
      error => {
        this.alertService.error('Ocurrió un error listando las encuestas');
        console.log("Error listing surveys ::: ", error);
      }
    );
  }

  private buildSpecialtyInfo(surveys: Survey[]) {
    this.specialties = this.buildSpecialtiesFilter(surveys);

    if (this.specialties.length > 0 && !this.selectedSpecialty) {
      this.selectedSpecialty = this.specialties[0];
    }
  }

  private buildSpecialtiesFilter(surveys: Survey[]): Specialty[] {
    let uniqueSpecialties = new Map<number, Specialty>();

    surveys
      .map(survey => survey.template.specialties.forEach(specialty => uniqueSpecialties.set(specialty.id, specialty)));

    return Array.from(uniqueSpecialties.values());
  }

  private buildFilteredBasicSurveys(surveys: Survey[]): Survey[] {
    let temp1 = new Map<number, Survey>();

    let temp2 = surveys.filter(survey =>
      !survey.event
      && survey.template.type === "BASIC_INFO"
      //&& survey.template.specialties.forEach(specialty => specialty.id == this.selectedSpecialty.id)
      //&& survey.template.specialty.id === this.selectedSpecialty.id
    );

    for(let survey of temp2){
      for(let specialty of survey.template.specialties){
        if(specialty.id == this.selectedSpecialty.id){
          temp1.set(survey.id, survey);
        }
      }
    }

    return Array.from(temp1.values());
  }

  private buildFilteredEvents(surveys: Survey[]): Event[] {
    let uniqueEvents = new Map<number, Event>();
    let temp1 = new Map<number, Survey>();

    let temp2 = surveys.filter(survey =>
      survey.event
      && survey.template.type === "SPECIALTY_INFO"
      //&& survey.template.specialties.forEach(specialty => specialty.id == this.selectedSpecialty.id)
    );
      
    for(let survey of temp2){
      for(let specialty of survey.template.specialties){
        if(specialty.id == this.selectedSpecialty.id){
          temp1.set(survey.id, survey);
        }
      }
    }

    let temp3 = Array.from(temp1.values());
      
    temp3.map(survey => {
      let event: Event = survey.event;
      event.surveys = [survey];
      return event;
    })
    .forEach(event => {
      if (uniqueEvents.has(event.id)) {
        uniqueEvents.get(event.id).surveys.push(...event.surveys);
      } else {
        uniqueEvents.set(event.id, event);
      }
    });

    let eventList : Event[] = Array.from(uniqueEvents.values());
    eventList.forEach(event => {
      event.surveys.sort(function(a,b) { return a.template.order_id - b.template.order_id });
    });

    return eventList;
  }

  selectSpecialtyFilter(selectedSpecialty: Specialty) {
    this.selectedSpecialty = selectedSpecialty;
    this.filteredBasicSurveys = this.buildFilteredBasicSurveys(this.surveys);
    this.filteredEvents = this.buildFilteredEvents(this.surveys);
  }

  onSelectNewEvent(): void {
    this.newEvent = Event.empty();
  }
  
  onSelectDeleteEvent(event: Event): void {
    this.newEvent = event;
  }

  onSaveEvent() {
    if(this.newEvent.name != null && this.newEvent.createdDate != null
      && this.newEvent.name != '' && this.newEvent.createdDate != ''){

        this.newEvent.specialty = this.selectedSpecialty;

        this.eventService.save(this.patient.id, this.newEvent).subscribe(
          event => {
            this.buildSurveysInfo(this.patient.id);
          },
          error => {
            this.alertService.error('Ocurrió un error guardando el evento');
            console.log("Error saving event ::: ", error);
          }
        );
      }else{
        this.alertService.error('Todos los campos son obligatorios');
      }
  }

  onDeleteEvent(): void {
    this.eventService.delete(this.patient.id, this.newEvent).subscribe(
      resp => {
        this.newEvent = null;
        this.buildSurveysInfo(this.patient.id);
        this.alertService.success('Evento eliminado correctamente');
      },
      error => {
        if(error.status == 424) {
          this.alertService.warning('El evento tiene dependencias que deben ser eliminadas primero');
        }else {
          this.alertService.error('Ocurrió un error eliminando el evento');
          console.log("Error deleting Event ::: ", error);
        }
      }
    );
  }

  getSurveyStateStyle(state: string) {
    switch (state) {
      case 'NOT_STARTED':
        return 'survey-not-started';
      case 'STARTED':
        return 'survey-started';
      case 'FINISHED':
        return 'survey-solved';
      default:
        return 'survey-invalid-state';
    }
  }

  hasBasicSurveysFinished(): boolean {
    if (this.filteredBasicSurveys) {
      let pendingSurvey: Survey = this.filteredBasicSurveys.find(survey => survey.state != "FINISHED");

       if(!pendingSurvey) {
         return true;
       }
    }

    return false;
  }

}
