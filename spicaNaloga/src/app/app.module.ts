import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { AbsencesComponent } from './absences/absences.component';
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
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
