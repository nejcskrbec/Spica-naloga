import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError, catchError } from "rxjs";

import { UsersService } from 'src/app/services/users.service';

declare var $: any;

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  newUserFirstNameForm = new FormControl();
  newUserFirstName: string = "";
  newUserLastNameForm = new FormControl();
  newUserLastName: string = "";
  newUserEmailForm = new FormControl();
  newUserEmail: string = "";


  constructor(private router: Router,
    private usersService: UsersService) {
    this.newUserFirstNameForm.valueChanges.subscribe((nameValue) => {
      this.newUserFirstName = nameValue;
    });
    this.newUserLastNameForm.valueChanges.subscribe((nameValue) => {
      this.newUserLastName = nameValue;
    });
    this.newUserEmailForm.valueChanges.subscribe((emailValue) => {
      this.newUserEmail = emailValue;
    });
  }
  showModal(): void {
    $('#ModalFormAddUser').modal('show');
  }
  hideModal(): void {
    $('#ModalFormAddUser').modal('hide');
  }
  submit(): void {
      const newUser = {
        FirstName: this.newUserFirstName,
        LastName: this.newUserLastName,
        FullName: this.newUserFirstName + " " + this.newUserLastName,
        Email: this.newUserEmail,
      };
      this.usersService
      .postUser(newUser)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.hideModal();
      });
  }
}
