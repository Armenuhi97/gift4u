import { Component, ApplicationRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'uncle-razor';

  constructor(private _ref: ApplicationRef, private _router: Router) {
    _router.events.subscribe((value) => {
      _ref.tick();
    });
  }
}
