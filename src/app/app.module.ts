import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './week-calendar/week-calendar.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

import { StoreModule } from '@ngrx/store';
import { toggleModalReducer } from './store/toggle.reducer';
import { getCalendarEvents, setViewDate } from './store/setup.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YearCalendarComponent } from './year-calendar/year-calendar.component';

@NgModule({
  declarations: [AppComponent, CalendarComponent, YearCalendarComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      toggleModal: toggleModalReducer,
      calendarEvents: getCalendarEvents,
      viewDate: setViewDate,
    }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
