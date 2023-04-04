import { Component, Inject, NgZone } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly ngZone: NgZone,
    private readonly viewportRuler: ViewportRuler,
  ) {}

  // Resize
  resize(): void {
    var mainContainer: any = document.querySelector("#main-container");
    var navbar: any = document.querySelector(".navbar");
    mainContainer.style.setProperty("margin-top", navbar.getBoundingClientRect().height + "px", "important");
  }

  ngAfterViewInit(): void {
    this.resize();
  }

  private readonly viewportChange = this.viewportRuler
  .change(200)
  .subscribe(() => this.ngZone.run(() => this.resize()));
}
