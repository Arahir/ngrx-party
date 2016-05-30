import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {Store, provideStore, usePreMiddleware, usePostMiddleware} from '@ngrx/store';
import {id} from './id';
import {people} from './people';
import {partyFilter} from './party-filter';
import {partyModel, percentAttending} from './selectors';
import {actionLogger, stateLogger, localStorageMiddleware} from './middleware';
import {LocalStorageService} from './service';
import {rehydrateState} from './rehydrate';
import {reset, RESET_STATE} from './reset';

import {
  ADD_PERSON,
  REMOVE_PERSON,
  ADD_GUEST,
  REMOVE_GUEST,
  TOGGLE_ATTENDING
} from './actions';
import {PersonList} from './person-list';
import {PersonInput} from './person-input';
import {FilterSelect} from './filter-select';
import {PartyStats} from './party-stats';


@Component({
  selector: 'party',
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif
    }
    md-card{
      margin: 25px;
    }
  `],
  template: `
    <h3>@ngrx/store Party Planner</h3>
    <button (click)="resetParty()" class="margin-bottom-10">
      Reset Party
    </button>
    <div class="margin-bottom-10">
      Percent Attendance: {{percentAttendance | async}}%
    </div>
    <party-stats
      [invited]="(model | async)?.total"
      [attending]="(model | async)?.attending"
      [guests]="(model | async)?.guests"
    >
    </party-stats>
    <filter-select
      (updateFilter)="updateFilter($event)"
    >
    </filter-select>
    <person-input
      (addPerson)="addPerson($event)"
    >
    </person-input>
    <person-list
      [people]="(model | async)?.people"
      (addGuest)="addGuest($event)"
      (removeGuest)="removeGuest($event)"
      (removePerson)="removePerson($event)"
      (toggleAttending)="toggleAttending($event)"
    >
    </person-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [PersonList, PersonInput, FilterSelect, PartyStats],
  pipes: [AsyncPipe]
})
export class Party {
  public model;
  public percentAttendance;

    constructor(private _store){
      /*
        Every time people or partyFilter emits, pass the latest
        value from each into supplied function. We can then calculate
        and output statistics.
      */
      this.model = Observable.combineLatest(
            _store.select('people'),
            _store.select('partyFilter')
          )
          //extracting party model to selector
          .let(partyModel());
      //for demonstration on combining selectors
      this.percentAttendance = _store.let(percentAttending());
    }
    //all state-changing actions get dispatched to and handled by reducers
    addPerson(name){
      this._store.dispatch({type: ADD_PERSON, payload: {id: id(), name}})
    }

    addGuest(id){
      this._store.dispatch({type: ADD_GUEST, payload: id});
    }

    removeGuest(id){
      this._store.dispatch({type: REMOVE_GUEST, payload: id});
    }

    removePerson(id){
      this._store.dispatch({type: REMOVE_PERSON, payload: id});
    }

    toggleAttending(id){
      this._store.dispatch({type: TOGGLE_ATTENDING, payload: id})
    }

    updateFilter(filter){
      this._store.dispatch({type: filter})
    }

    resetParty(){
      this._store.dispatch({type: RESET_STATE})
    }
}
