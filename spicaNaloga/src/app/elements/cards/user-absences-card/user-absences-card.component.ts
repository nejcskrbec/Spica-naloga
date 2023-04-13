import { Component, Input } from '@angular/core';

import { AuthorizationService } from 'src/app/services/authorization.service';
import { EditUserService } from 'src/app/services/edit-user.service';

@Component({
  selector: 'app-user-absences-card',
  templateUrl: './user-absences-card.component.html',
  styleUrls: ['./user-absences-card.component.css']
})
export class UserAbsencesCardComponent {
  @Input() id: string = '';
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() absenceDefinitionName = '';
  @Input() partialTimeFrom: string = '';
  @Input() partialTimeTo: string = '';
  @Input() isPartial: boolean = false;
  @Input() overrideHolidayAbsence: boolean = false;
  @Input() comment: string = '';

  constructor(
    private authorizationService: AuthorizationService,
    private editUserService: EditUserService) {}
}
