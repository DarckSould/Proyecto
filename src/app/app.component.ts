import { Component } from '@angular/core';
import { DarkModeService } from './services/dark-mode.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto';


  isDarkMode = false;
constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.updateBodyClass();
    });
  }

  updateBodyClass() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}