import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-authorization-modal',
  templateUrl: './authorization-modal.component.html',
  styleUrls: ['./authorization-modal.component.css']
})
export class AuthorizationModalComponent {
  constructor(private router: Router) {}
  showModal() {
    $('#ModalFormAuthorize').modal('show');
  }
  hideModal() {
    localStorage.clear();
    $('#ModalFormAuthorize').modal('hide');
    setTimeout(() => {
      this.router.navigate(['/settings']);
    }, 1000);
  }
}
