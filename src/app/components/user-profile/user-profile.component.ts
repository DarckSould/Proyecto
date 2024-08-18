// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user$: Observable<any> = new Observable();

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.user$ = this.afAuth.user;
  }
}
