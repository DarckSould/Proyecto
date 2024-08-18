
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirebaseCodeErrorService } from './services/firebase-code-error.service';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
// Import FormsModule
import { FormsModule } from '@angular/forms';



import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    SpinnerComponent,
    RecuperarPasswordComponent,
    VerificarCorreoComponent,
    ReservasComponent,
    ContactanosComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule, // Agregar HttpClientModule a los imports
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

  ],
  providers: [FirebaseCodeErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
