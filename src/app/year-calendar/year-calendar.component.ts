import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { State, Store } from '@ngrx/store';
import { viewDate } from '../store/setup.action';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss'],
})
export class YearCalendarComponent implements OnInit {
  calendarEvents$: any[];

  viewDate$: Date = new Date('2019-02-27T11:00:00.000+0000');

  constructor(
    private store: Store<{ viewDate: any }>,
    private state: State<{ calendarEvents: any[] }>
  ) {
    this.calendarEvents$ = this.state.getValue().calendarEvents;

    this.store.select('viewDate').subscribe((res) => {
      this.viewDate$ = new Date(res);
    });
  }

  ngOnInit(): void {}

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.calendarEvents$
        .map((event) => new Date(event.date))
        .some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );
      return highlightDate ? 'has-events' : '';
    };
  }

  getChangedValue(event: any) {
    this.store.dispatch(viewDate({ date: event }));
  }
}
