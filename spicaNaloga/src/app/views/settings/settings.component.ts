import { Component, Inject, NgZone } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError, catchError } from "rxjs";

import { Credentials } from 'src/app/shared/classes/credentials';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NavbarSizeService } from 'src/app/services/navbar-size.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  clientIdForm = new FormControl();
  clientId: string = "";
  clientSecretForm = new FormControl();
  clientSecret: string = "";

  public showCredentials = false;
  public authorized = false;


  constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly ngZone: NgZone,
    private readonly viewportRuler: ViewportRuler,
    private authorizationService: AuthorizationService,
    private navbarSizeService: NavbarSizeService,
  ) {
    this.clientIdForm.valueChanges.subscribe((idValue) => {
      this.clientId = idValue;
    });
    this.clientSecretForm.valueChanges.subscribe((secretValue) => {
      this.clientSecret = secretValue;
    });
    this.navbarSizeService.getResizeEvent().subscribe(event => {
      this.resize();
    });
  }

  // Resize
  resize(): void {
    var mainContainer: any = document.querySelector(".settings");
    var navbar: any = document.querySelector(".navbar");
    if (mainContainer != null && navbar != null) {
      mainContainer.style.setProperty("margin-top", navbar.getBoundingClientRect().height + "px", "important");
      mainContainer.style.setProperty("height", window.innerHeight - navbar.getBoundingClientRect().height + "px", "important");
    }
  }

  ngAfterViewInit(): void {
    this.resize();
    if (this.authorizationService.getToken() != null) {
      this.authorized = true;
    }
  }

  private readonly viewportChange = this.viewportRuler
  .change(200)
  .subscribe(() => this.ngZone.run(() => this.resize()));

  public doAuthorize(): void {
    const myCredentials = new Credentials(this.clientId, this.clientSecret);
    this.authorizationService
      .authorize(myCredentials)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        console.log('Authorization successful!')
        this.authorized = true;
        console.log(this.authorizationService.getToken());
      });
  }
}
