import { createAction, props } from '@ngrx/store';

export const calendarEvents = createAction('[Setup] calendar Events');
export const viewDate = createAction(
  '[View Date] change date',
  props<{ date }>()
);
