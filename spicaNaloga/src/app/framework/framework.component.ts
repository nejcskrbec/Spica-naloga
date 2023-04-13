import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { NavbarSizeService } from '../services/navbar-size.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent {
  navWidth = 0;
  navHeight = 0;

  constructor(
    private navbarSizeService: NavbarSizeService
  ) { }

  onResized(event: ResizedEvent): void {
    this.navWidth = Math.round(event.newRect.width);
    this.navHeight = Math.round(event.newRect.height);
    this.navbarSizeService.emitResizeEvent([this.navWidth, this.navHeight]);
  }


}
