import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {
  title = 'localstorage'
  myform!:FormGroup;
  resultado!: string;


  constructor(private formBuilder:FormBuilder){
    this.myform = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    archivo: new FormControl
    })
  }


  ngOnInit():void{}

 

  onSubmit(){

  }

}