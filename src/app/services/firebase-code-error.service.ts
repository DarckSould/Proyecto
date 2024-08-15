// firebase-code-error.service.ts
import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCodeErrorService {
  constructor() {}

  codeError(code: string): string {
    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy débil';
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo inválido';
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta';
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Por favor, intente de nuevo más tarde.';
      case 'auth/invalid-login-credentials':
        return 'Credenciales de inicio de sesión inválidas';
      default:
        return 'Error desconocido';
    }
  }
}
