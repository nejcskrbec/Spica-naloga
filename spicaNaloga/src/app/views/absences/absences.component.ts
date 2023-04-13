import { Component, Inject, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError, catchError } from "rxjs";
import { FormControl } from '@angular/forms';
import { NgbDropdownModule, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

import { AuthorizationService } from 'src/app/services/authorization.service';
import { UsersService } from 'src/app/services/users.service';

import { UserCardComponent } from 'src/app/elements/cards/user-card/user-card.component';
import { AuthorizationModalComponent } from 'src/app/elements/modals/authorization-modal/authorization-modal.component';
import { AddUserModalComponent } from 'src/app/elements/modals/add-user-modal/add-user-modal.component';
import { uniqueSort } from 'jquery';

interface Absence {
  Id: string;
  FirstName: string;
  LastName: string;
  AbsenceDefinitionName: string;
  PartialTimeFrom: string;
  PartialTimeTo: string;
  IsPartial: boolean,
  OverrideHolidayAbsence: boolean,
  Comment: string
}

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent {

  public absences: Absence[] = [];
  private allAbsences: Absence[] = [];
  public absenceDefinitions: any;
  public pageSize: number = 6;
  public page: number = 1;

  public options: any;
  public selectedOption: any;

  modelFrom: any;
  modelTo: any;

  searchTermForm = new FormControl();
  searchTerm: string = "";

  @ViewChild(AuthorizationModalComponent) authorizationModal: any;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly ngZone: NgZone,
    private readonly viewportRuler: ViewportRuler,
    private authorizationService: AuthorizationService,
    private usersService: UsersService
  ) {}

  ngAfterViewInit(): void {
    this.resize();
    this.fetchAbsences();
    this.fetchAbsenceDefinitions();
  }

  private readonly viewportChange = this.viewportRuler
  .change(200)
  .subscribe(() => this.ngZone.run(() => this.resize()));

  // Resize
  resize(): void {
    var mainContainer: any = document.querySelector("#main-container");
    var navbar: any = document.querySelector(".navbar");
    mainContainer.style.setProperty("margin-top", navbar.getBoundingClientRect().height + "px", "important");
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

  fetchAbsenceDefinitions() {
    if (this.checkAuthorization()) {
      this.usersService
      .getAbsenceDefinitions()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe((absences) => {
        this.absenceDefinitions = absences;
        this.absenceDefinitions.unshift(
          {
            CategoryDefinitionId: '',
            CategoryDefinitionName: '',
            Code: -1,
            Fraction: 1,
            IconId: '',
            Id: '',
            IntegrationId: -1,
            IsAvailableForAdminsOnly: false,
            Name: 'Any',
            Type: 0
          }
        );
      });
    }
  }

  fetchAbsences() {
    if (this.checkAuthorization()) {
      this.usersService
      .getAbsences()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe((absences) => {
        this.absences = absences.map(obj => ({ 
          Id: obj.Id, 
          FirstName: obj.FirstName, 
          LastName: obj.LastName, 
          AbsenceDefinitionName: obj.AbsenceDefinitionName,
          PartialTimeFrom: obj.PartialTimeFrom, 
          PartialTimeTo: obj.PartialTimeTo,
          IsPartial:obj.IsPartial,
          OverrideHolidayAbsence: obj.OverrideHolidayAbsence,
          Comment: obj.Comment,
        }));
        this.allAbsences = absences;
      });
    }
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

  selectOption(option: any) {
    console.log(option)
    this.selectedOption = option;
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

  searchAbsences() {
    if (this.checkAuthorization()) {
      if (this.modelFrom == undefined) {
        alert('Please enter a start date!')
      }
      else if (this.modelTo == undefined) {
        alert('Please enter an end date!')
      } else {
        const params = {
          dateFrom: this.NgbDateStructToISOString(this.modelFrom),
          dateTo: this.NgbDateStructToISOString(this.modelTo),
        }
        console.log(params)
        this.usersService
        .getAbsencesBySearch(params)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
          })
        )
        .subscribe((absences) => {
          this.absences = absences
        });
      }
    }
  }

}
