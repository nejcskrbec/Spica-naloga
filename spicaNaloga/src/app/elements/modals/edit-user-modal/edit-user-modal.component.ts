import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError, catchError, Subscription } from "rxjs";
import { NgbDropdownModule, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

import { UsersService } from 'src/app/services/users.service';
import { EditUserService } from 'src/app/services/edit-user.service';

declare var $: any;

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css'],
})
export class EditUserModalComponent {

  private id: string = '';

  private subscription: Subscription;
  public options: any;
  public selectedOption: any;

  modelFrom: any;
  modelTo: any;

  commentForm = new FormControl();
  comment: string = "";
  charCount: number = 0;

  public isPartial = false;
  public overridesHolidayAbsence = false;

  constructor(private router: Router,
    private usersService: UsersService,
    private editUserService: EditUserService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter) {

    this.commentForm.valueChanges.subscribe((comment) => {
      this.comment = comment;
      this.charCount = this.comment.length;
    });

    this.subscription = editUserService.getEditEvent().subscribe((data: any) => {
      this.id = data.id;
      this.options = data.absenceDefinitions;
      this.showModal();
    });
  }

  showModal(): void {
    $('#ModalFormEditUser').modal('show');
  }

  hideModal(): void {
    $('#ModalFormEditUser').modal('hide');
  }

  selectOption(option: any) {
    this.selectedOption = option;
  }

  greaterDate(date1: NgbDateStruct, date2: NgbDateStruct): NgbDateStruct {
    if (date1.year > date2.year) {
      return date1;
    } else if (date1.year < date2.year) {
      return date2;
    } else {
      if (date1.month > date2.month) {
        return date1;
      } else if (date1.month < date2.month) {
        return date2;
      } else {
        if (date1.day > date2.day) {
          return date1;
        } else if (date1.day < date2.day) {
          return date2;
        } else {
          return date1;
        }
      }
    }
  }
  
  equalDates(date1: NgbDateStruct, date2: NgbDateStruct): boolean {
    return (date1.year == date2.year && date1.month == date2.month && date1.day == date2.day);
  }
  
	onDateSelection(date: any, datepicker: any) {
    if (this.modelFrom != null && this.modelTo != null) {
      if(this.greaterDate(this.modelFrom, this.modelTo) == this.modelFrom) {
        if (this.equalDates(this.modelFrom, this.modelTo)) {
          alert("Please select different start and end dates!")
          if (datepicker == "dTo") {
            this.modelFrom = null;
          } else {
            this.modelTo = null;
          }
        } else {
          alert("The absence start date should not be greater than the end date!")
          if (datepicker == "dTo") {
            this.modelFrom = null;
          } else {
            this.modelTo = null;
          }
        }
      }
    }
	}

  DateToISOString(date: Date): string {
    return date.toISOString();
  }

  NgbDateStructToISOString(date: NgbDateStruct): string {
    return (this.DateToISOString(new Date(Date.UTC(date.year, date.month - 1, date.day))));
  }

  submit(): void {
    if (this.modelFrom == undefined) {
      alert('Please enter a start date!')
    }
    else if (this.modelTo == undefined) {
      alert('Please enter an end date!')
    } else {
      const newAbsence = {
        UserId: this.id,
        TimeStamp: this.DateToISOString(new Date()),
        AbsenceDefinitionId: this.selectedOption.Id,
        Origin: 0,
        Comment: this.comment,
        PartialTimeFrom: this.NgbDateStructToISOString(this.modelFrom),
        PartialTimeTo: this.NgbDateStructToISOString(this.modelTo),
        PartialTimeDuration: 0,
        IsPartial: this.isPartial,
        OverrideHolidayAbsence: this.overridesHolidayAbsence
  
      };
      this.usersService
      .postAbsence(newAbsence)
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
}

