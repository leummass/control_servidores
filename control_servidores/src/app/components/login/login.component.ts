import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  numemp: number;
  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      empleado: ['', Validators.required]
    })
  }
  login(){
    console.log(this.form);
    console.log(this.form.value.empleado);
    
  }
}
