import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RequestComponent } from './components/request/request.component';
import { QueryComponent } from './components/query/query.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PetitionComponent } from './components/petition/petition.component';
import { GrievanceComponent } from './components/grievance/grievance.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RequestComponent,
    QueryComponent,
    PetitionComponent,
    GrievanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
