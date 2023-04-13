import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarSizeService {
  private resizeEvent = new Subject<any>();

  emitResizeEvent(event: any) {
    this.resizeEvent.next(event);
  }

  getResizeEvent() {
    return this.resizeEvent.asObservable();
  }
}
