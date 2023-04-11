import { Component, Inject, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError, catchError } from "rxjs";
import { FormControl } from '@angular/forms';

import { AuthorizationService } from 'src/app/services/authorization.service';
import { UsersService } from 'src/app/services/users.service';

import { UserCardComponent } from 'src/app/elements/cards/user-card/user-card.component';
import { AuthorizationModalComponent } from 'src/app/elements/modals/authorization-modal/authorization-modal.component';
import { AddUserModalComponent } from 'src/app/elements/modals/add-user-modal/add-user-modal.component';

interface User {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  public users: User[] = [];
  private allUsers: User[] = [];
  public pageSize: number = 12;
  public page: number = 1;

  searchTermForm = new FormControl();
  searchTerm: string = "";

  @ViewChild(AuthorizationModalComponent) authorizationModal: any;
  @ViewChild(AddUserModalComponent) addUserModal: any;

  public usersObject: any;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly ngZone: NgZone,
    private readonly viewportRuler: ViewportRuler,
    private authorizationService: AuthorizationService,
    private usersService: UsersService
  ) {
    this.searchTermForm.valueChanges.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
    });
  }
  
  ngAfterViewInit(): void {
    this.resize();
    this.fetchUsers();
    this.usersObject = {
      authorizationService: this.authorizationService,
      authorizationModal: this.authorizationModal,
      checkAuthorization: () => {
        console.log('checking')
        if (this.authorizationService.getToken() != null) {
          var currentDate = new Date();
          if (currentDate <= this.authorizationService.getToken().expires_in) {
            return true;
          }
        }      
        this.authorizationModal.showModal();
        return false;
      }
    }
  }

  private readonly viewportChange = this.viewportRuler
  .change(200)
  .subscribe(() => this.ngZone.run(() => this.resize()));

  // Resize
  resize(): void {
    var mainContainer: any = document.querySelector("#main-container");
    var navbar: any = document.querySelector(".navbar");
    mainContainer.style.setProperty("margin-top", navbar.getBoundingClientRect().height + "px", "important");
    mainContainer.style.setProperty("padding-top", navbar.getBoundingClientRect().height + "px", "important");
    mainContainer.style.setProperty("height", window.innerHeight - navbar.getBoundingClientRect().height + "px", "important");
  }

  checkAuthorization(): boolean | undefined {
    if (this.authorizationService.getToken() != null) {
      var currentDate = new Date();
      if (currentDate <= this.authorizationService.getToken().expires_in) {
        return true;
      }
    }      
    this.authorizationModal.showModal();
    return false;
  }
  
  fetchUsers() {
    if (this.checkAuthorization()) {
      this.usersService
      .getUsers()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe((users) => {
        this.users = users.map(obj => ({ Id: obj.Id, FirstName: obj.FirstName, LastName: obj.LastName, Email: obj.Email }));
        this.allUsers = users;
      });
    }
  }

  searchUsers() {
    if (this.checkAuthorization()) {
      this.usersService
      .getUsersBySearch(this.searchTerm)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe((users) => {
        this.users = users
      });
    }
  }

  public showAddUserModal(): void {
    if (this.checkAuthorization()) {
      this.addUserModal.showModal();
    }
  }
}
