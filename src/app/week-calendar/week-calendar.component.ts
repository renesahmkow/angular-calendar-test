import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import data from '../../assets/data.json';
import { toggleModal } from '../store/toggle.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-calendar',
  styleUrls: ['./week-calendar.component.scss'],
  templateUrl: './week-calendar.component.html',
})
export class CalendarComponent {
  toggleModal$ = false;
  calendarEvents$: any[] = [];
  viewDate$: Date = new Date();

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  modalData?: any;

  informationData?: any;

  events: CalendarEvent[] = [];

  event: any;

  constructor(
    private store: Store<{
      toggleModal: boolean;
      calendarEvents: any[];
      viewDate: Date;
    }>
  ) {
    // import Store data

    this.store.select('toggleModal').subscribe((res) => {
      this.toggleModal$ = res;
    });

    this.store.select('calendarEvents').subscribe((res) => {
      this.calendarEvents$ = res;

      if (this.calendarEvents$.length) {
        this.calendarEvents$.map((node) => {
          const eventNode = {
            id: node.id,
            start: new Date(node.date),
            end: new Date(
              new Date(node.date).setHours(new Date(node.date).getHours() + 1)
            ),
            title: node.property.name,
          };
          this.events.push(eventNode);
        });
      }
    });
    this.store.select('viewDate').subscribe((res) => {
      this.viewDate$ = new Date(res);
    });
  }

  //  Modalbox functions

  handleEvent(event: CalendarEvent): void {
    this.modalData = data.data.appointments.nodes.find((node) => {
      return node.id === event.id;
    });

    this.setInformationData();

    this.store.dispatch(toggleModal());
  }

  closeModal(): void {
    if (this.toggleModal$) this.store.dispatch(toggleModal());
  }

  // Modalbox information

  setInformationData() {
    this.informationData = Object.assign(
      {},
      {
        attendeeCount: this.modalData?.attendeeCount,
        date: {
          time: new Date(this.modalData?.date || '').toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          day: new Date(this.modalData?.date || '').toLocaleDateString(
            'de-DE',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          ),
        },
        maxInviteeCount: this.modalData?.maxInviteeCount,
      }
    );
  }

  // Modalbox next/prev Event

  nextEvent() {
    const event = this.modalData;

    const eventIndex = this.calendarEvents$.findIndex((node) => {
      return node.id === event.id;
    });

    if (eventIndex < this.calendarEvents$.length - 1) {
      this.modalData = this.calendarEvents$[eventIndex + 1];
      this.setInformationData();
    }
  }
  prevEvent() {
    const event = this.modalData;

    const eventIndex = this.calendarEvents$.findIndex((node) => {
      return node.id === event.id;
    });

    if (eventIndex > 0) {
      this.modalData = this.calendarEvents$[eventIndex - 1];
      this.setInformationData();
    }
  }

  // show Modalbox arrows

  showPrev() {
    const event = this.modalData;

    const eventIndex = this.calendarEvents$.findIndex((node) => {
      return node.id === event.id;
    });

    return eventIndex === 0 ? false : true;
  }

  showNext() {
    const event = this.modalData;

    const eventIndex = this.calendarEvents$.findIndex((node) => {
      return node.id === event.id;
    });

    return eventIndex === this.calendarEvents$.length - 1 ? false : true;
  }
}
