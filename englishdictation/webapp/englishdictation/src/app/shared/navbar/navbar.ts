import {Component, OnDestroy} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {Subscription} from 'rxjs';
import {NavigationFocusService} from '../navigation-focus/navigation-focus.service';
import {ThemePicker} from '../theme-picker/theme-picker';
import {AppLogo} from '../logo/logo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    ThemePicker,
    AppLogo,
    NgTemplateOutlet,
  ],
})
export class NavBar implements OnDestroy {
  private subscriptions = new Subscription();
  skipLinkHref: string | null | undefined;
  skipLinkHidden = true;

  constructor(private navigationFocusService: NavigationFocusService) {
    setTimeout(() => this.skipLinkHref = this.navigationFocusService.getSkipLinkHref(), 100);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

