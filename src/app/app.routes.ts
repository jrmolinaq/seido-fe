import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SurveyTemplateComponent } from './survey-template/survey-template.component';
import { MainPatientComponent } from './patient/main-patient/main-patient.component';
import { FindPatientComponent } from './patient/find-patient/find-patient.component';
import { ListPatientsComponent } from './patient/list-patients/list-patients.component';
import { EventComponent } from './event/event.component';
import { SurveyComponent } from './survey/survey.component';
import { AuthGuard } from './shared_services/auth.guard';
import { MainUserComponent } from './user/main-user/main-user.component';
import { FindUserComponent } from './user/find-user/find-user.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { Control6Component } from './add-ons/control6/control6.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
    { path: 'specialty', component: SpecialtyComponent, canActivate: [AuthGuard] },
    { path: 'specialty/:specialtyId/survey-template', component: SurveyTemplateComponent, canActivate: [AuthGuard] },
    { path: 'patient', component: MainPatientComponent, canActivate: [AuthGuard] },
    { path: 'findpatient', component: FindPatientComponent, canActivate: [AuthGuard] },
    { path: 'listpatients', component: ListPatientsComponent, canActivate: [AuthGuard] },
    { path: 'patient/:patientId/event', component: EventComponent, canActivate:[AuthGuard]},
    { path: 'patient/:patientId/survey/:surveyId', component: SurveyComponent, canActivate:[AuthGuard]},
    { path: 'user', component: MainUserComponent, canActivate: [AuthGuard] },
    { path: 'finduser', component: FindUserComponent, canActivate: [AuthGuard] },
    { path: 'listusers', component: ListUsersComponent, canActivate: [AuthGuard] },
    { path: 'control6', component: Control6Component, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];