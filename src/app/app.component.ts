import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { calendarEvents, viewDate } from './store/setup.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'immomio';

  constructor(private store: Store<{ calendarEvents: any; viewDate: any }>) {
    this.store.dispatch(calendarEvents());
    this.store.dispatch(viewDate({ date: null }));
  }
}
