import {Injectable} from '@angular/core';
//simple service wrapping local storage
@Injectable()
export class LocalStorageService {
    setItem(key, value){
      localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key){
      return JSON.parse(localStorage.getItem(key));
    }
}
