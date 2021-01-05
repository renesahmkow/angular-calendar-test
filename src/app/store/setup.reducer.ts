import { createReducer, on } from '@ngrx/store';
import { calendarEvents, viewDate } from './setup.action';
import data from '../../assets/data.json';

export const initialState = {};

const _getCalendarEvents = createReducer(
  initialState,
  on(
    calendarEvents,
    (state) =>
      (state = data.data.appointments.nodes.slice().sort((a, b) => {
        return new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1;
      }))
  )
);

const _setViewDate = createReducer(
  initialState,
  on(viewDate, (state, { date }) =>
    date
      ? (state = date)
      : (state = data.data.appointments.nodes.slice().sort((a, b) => {
          return new Date(a.date).getTime() > new Date(b.date).getTime()
            ? 1
            : -1;
        })[0].date)
  )
);

export function getCalendarEvents(state, action) {
  return _getCalendarEvents(state, action);
}

export function setViewDate(state, action) {
  return _setViewDate(state, action);
}
