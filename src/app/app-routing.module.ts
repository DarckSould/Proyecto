import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { ReservasComponent } from './components/reservas/reservas.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {
    path: 'dashboard',
    component: DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    children: [
      
    ]
  },

  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},


  {
    path:"register",
    component:RegisterComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },


  {path:"recuperar-password",component:RecuperarPasswordComponent},
  {path:"verificar-correo",component:VerificarCorreoComponent},
  {path:"reservas",component:ReservasComponent},



  {path:"**", redirectTo:"", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
