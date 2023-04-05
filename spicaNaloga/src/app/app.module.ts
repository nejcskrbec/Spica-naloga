import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { SettingsComponent } from './views/settings/settings.component';
import { UsersComponent } from './views/users/users.component';
import { AbsencesComponent } from './views/absences/absences.component';
import { FrameworkComponent } from './framework/framework.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UsersComponent,
    AbsencesComponent,
    FrameworkComponent
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
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
