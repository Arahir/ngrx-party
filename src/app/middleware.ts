import {createMiddleware} from '@ngrx/store';
import {LocalStorageService} from './service';

//pre middleware takes an observable of actions, returning an observable
export const actionLogger = action => {
  return action.do(a => console.log('DISPATCHED ACTION:', a));
}
//post middleware takes an observable of state, returning observable
export const stateLogger = state => {
  return state.do(s => console.log('NEW STATE:', s));
}
//create middleware with a dependency on the localStorageService
export const localStorageMiddleware = key => createMiddleware(localStorageService => {
  return state => {
    //sync specified state slice with local storage
    return state.do(state => localStorageService.setItem(key, state[key]));
  }
}, [LocalStorageService]);
