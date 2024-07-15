import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbar, MatIcon, MatTooltip, MatMenu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'English dictation';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  onOpenHome() {
    // DO nothing now
  }
  openCodeRepo() {
    // DO nothing now
  }
  onUserInfo() {
    // DO nothing now
  }
  onLogon() {
    // DO nothing now
  }
  onLogout() {
    // DO nothing now
  }
}
