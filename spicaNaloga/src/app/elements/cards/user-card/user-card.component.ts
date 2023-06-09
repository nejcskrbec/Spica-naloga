import { Component, Input } from '@angular/core';

import { AuthorizationService } from 'src/app/services/authorization.service';
import { EditUserService } from 'src/app/services/edit-user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() id: string = '';
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() email: string = '';
  @Input() usersObject: any;
  @Input() absenceDefinitions: any;

  constructor(
    private authorizationService: AuthorizationService,
    private editUserService: EditUserService) {}

  edit() {
    const data = {
      id: this.id,
      absenceDefinitions: this.absenceDefinitions,
    };
    this.editUserService.emitEditEvent(data);
  }

  
}
