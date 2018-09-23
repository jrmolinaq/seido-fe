import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared_components/header/header.component';
import { FooterComponent } from './shared_components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './shared_components/alert/alert.component';
import { CompanyComponent } from './company/company.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { MainPatientComponent } from './patient/main-patient/main-patient.component';
import { FindPatientComponent } from './patient/find-patient/find-patient.component';
import { ListPatientsComponent } from './patient/list-patients/list-patients.component';
import { SurveyTemplateComponent } from './survey-template/survey-template.component';
import { EventComponent } from './event/event.component';
import { SurveyComponent } from './survey/survey.component';
//import { UserComponent } from './user/user.component';
import { MainUserComponent } from './user/main-user/main-user.component';
import { FindUserComponent } from './user/find-user/find-user.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { Control6Component } from './add-ons/control6/control6.component';

import { AlertService } from './shared_services/alert.service';
import { AuthenticationService } from './shared_services/authentication.service';
import { UserService } from './user/user.service';
import { CompanyService } from './company/company.service';
import { SpecialtyService } from './specialty/specialty.service';
import { SurveyTemplateService } from './survey-template/survey-template.service';
import { PatientService } from './patient/patient.service';
import { SurveyService } from './survey/survey.service';
import { EventService } from './event/event.service';
import { Control6Service } from './add-ons/control6/control6.service';
import { AuthGuard } from './shared_services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    CompanyComponent,
    SpecialtyComponent,
    MainPatientComponent,
    FindPatientComponent,
    ListPatientsComponent,
    SurveyTemplateComponent,
    EventComponent,
    SurveyComponent,
    //UserComponent,
    MainUserComponent,
    FindUserComponent,
    ListUsersComponent,
    Control6Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    CompanyService,
    SpecialtyService,
    SurveyTemplateService,
    PatientService,
    EventService,
    SurveyService,
    Control6Service,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
