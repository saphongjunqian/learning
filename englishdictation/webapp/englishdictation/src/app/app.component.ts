import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavBar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavBar],
  encapsulation: ViewEncapsulation.None,
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
