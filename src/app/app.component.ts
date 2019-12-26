import { Component, ApplicationRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from './com/annaniks/gift4u/services/cookie.service';
import { PlatformService } from './com/annaniks/gift4u/services/platform.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'gift4u';

  constructor(private _ref: ApplicationRef, private _router: Router,
    private _platformService: PlatformService,
    private _translate: TranslateService, private _cookieService: CookieService) {
    _router.events.subscribe((value) => {
      _ref.tick();
    });
  }
}
