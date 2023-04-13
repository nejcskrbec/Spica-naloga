import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule, NgbAlertModule, NgbDateStruct  } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizeEventModule } from 'angular-resize-event';
import { CommonModule, JsonPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { SettingsComponent } from './views/settings/settings.component';
import { UsersComponent } from './views/users/users.component';
import { AbsencesComponent } from './views/absences/absences.component';
import { FrameworkComponent } from './framework/framework.component';
import { UserCardComponent } from './elements/cards/user-card/user-card.component';
import { AuthorizationModalComponent } from './elements/modals/authorization-modal/authorization-modal.component';
import { AddUserModalComponent } from './elements/modals/add-user-modal/add-user-modal.component';
import { EditAbsencesModalComponent } from './elements/modals/edit-absences-modal/edit-absences-modal.component';
import { EditUserModalComponent } from './elements/modals/edit-user-modal/edit-user-modal.component';
import { AbsencesUserCardComponent } from './absences-user-card/absences-user-card.component';
import { UserAbsencesCardComponent } from './elements/cards/user-absences-card/user-absences-card.component';
import { IsoToDatePipe } from './pipes/iso-to-date.pipe';

@NgModule({
  declarations: [
    SettingsComponent,
    UsersComponent,
    AbsencesComponent,
    FrameworkComponent,
    UserCardComponent,
    AuthorizationModalComponent,
    AddUserModalComponent,
    EditAbsencesModalComponent,
    EditUserModalComponent,
    AbsencesUserCardComponent,
    UserAbsencesCardComponent,
    IsoToDatePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/users', pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'absences', component: AbsencesComponent }
    ], { scrollPositionRestoration: 'top' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule, 
    NgbAlertModule,
    JsonPipe,
    AngularResizeEventModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
