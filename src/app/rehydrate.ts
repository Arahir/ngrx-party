import {provide, Provider} from '@angular/core';
import {INITIAL_STATE} from '@ngrx/store';

export const rehydrateState = key => {
  //override initial state token for use in store
  return provide(INITIAL_STATE, {
    useValue: { [key]: JSON.parse(localStorage.getItem(key))}
  });
};
