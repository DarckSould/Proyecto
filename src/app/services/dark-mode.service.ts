import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialMode());
  darkMode$ = this.darkModeSubject.asObservable();

  toggleDarkMode() {
    const newMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newMode);
    this.saveMode(newMode);
  }

  setDarkMode(isDark: boolean) {
    this.darkModeSubject.next(isDark);
    this.saveMode(isDark);
  }

  private getInitialMode(): boolean {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  }

  private saveMode(isDark: boolean) {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }
}
