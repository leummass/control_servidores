import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  numemp: number;
  cargando: boolean = false;
  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router:Router){
    this.form = this.formBuilder.group({
      empleado: ['', Validators.required,]
    })
  }
  login(){
    this.numemp=this.form.value.empleado;
    if(this.loginService.login(this.numemp)){
      console.log("Logged in");
      this.falsoCargando();
      
    }else{
      console.log("No se pudo iniciar sesión");
      this.form.reset();
    }
    
  }
  falsoCargando(){
    this.cargando=true;
    setTimeout(()=>{
      //añadir routing
      this.router.navigate(['inicio']);
    },1500);
  }
}
