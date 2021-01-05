import { createReducer, on } from '@ngrx/store';
import { toggleModal } from './toggle.actions';

export const initialState = false;

const _toggleModalReducer = createReducer(
  initialState,
  on(toggleModal, (state) => (state = !state))
);

export function toggleModalReducer(state, action) {
  return _toggleModalReducer(state, action);
}
