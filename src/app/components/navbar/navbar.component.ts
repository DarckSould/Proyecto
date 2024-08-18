import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  loading: boolean = false;


  @ViewChild('dashboardContent') dashboardContent!: ElementRef;
  activeSubMenus: string[] = [];


  isActive = false;
  isDarkMode = false;
  activeSubMenu: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private darkModeService: DarkModeService,
    private route: ActivatedRoute
  ) {
    this.darkModeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  closeSidebar() {
    this.isActive = false;
  }

  onClick(): void {
    this.loading = true;
    this.userService.logout()
      .then(() => {
        this.toastr.success('¡Cierre de sesión logrado!', 'Éxito');
        this.router.navigate(['/login']);
        // Retraso de 1 segundo (1000 ms) antes de ocultar el spinner
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error('Error al cerrar sesión', 'Error');
        // También agregamos un retraso en caso de error para consistencia
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeSidebar();
  }


  toggleSubMenu(submenu: string, event: MouseEvent): void {
    event.stopPropagation(); // Evita que el clic en el ícono propague el evento

    const index = this.activeSubMenus.indexOf(submenu);
    if (index === -1) {
        // Si el submenú no está activo, lo agrega al array
        this.activeSubMenus.push(submenu);
    } else {
        // Si el submenú ya está activo, lo elimina del array
        this.activeSubMenus.splice(index, 1);
    }
}

isSubMenuActive(submenu: string): boolean {
    return this.activeSubMenus.includes(submenu);
}



ngOnInit(): void {
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
      // Agregar un pequeño retraso antes de hacer scroll
      setTimeout(() => {
        this.scrollTo(fragment);
      }, 100); // Ajusta el tiempo según sea necesario
    }
  });
}

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}