import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {Store, provideStore, usePreMiddleware, usePostMiddleware} from '@ngrx/store';
import {actionLogger, stateLogger, localStorageMiddleware} from './app/middleware';
import {LocalStorageService} from './app/service';
import {reset, RESET_STATE} from './app/reset';
import {people} from './app/people';
import {partyFilter} from './app/party-filter';


import {SeedApp} from './app/seed-app';


// enableProdMode()

bootstrap(SeedApp, [
  LocalStorageService,
  //wrap people in reset meta-reducer
  provideStore({people})
])
.catch(err => console.error(err));
