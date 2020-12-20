import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveValue(value: any, name: string): boolean {
    ApplicationSettings.setString(name, JSON.stringify(value));
    return true;
  }

  getValue(value: string): any {
      const valueToReturn = ApplicationSettings.getString(value);
      return valueToReturn ? JSON.parse(valueToReturn) : null;
  }

  removeValue(value: string): void {
    ApplicationSettings.remove(value);
  }

  clear(): void {
    ApplicationSettings.clear();
  }

}
