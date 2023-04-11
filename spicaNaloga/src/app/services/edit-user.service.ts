import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private editEvent = new Subject<any>();

  emitEditEvent(event: any) {
    this.editEvent.next(event);
  }

  getEditEvent() {
    return this.editEvent.asObservable();
  }
}