import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Catalogo_Servicio } from 'src/app/models/catalogo_servicio.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-servicios-anadir',
  templateUrl: './servicios-anadir.component.html',
  styleUrls: ['./servicios-anadir.component.css']
})
export class ServiciosAnadirComponent {
  numemp:string;
  fecha:string;
  servicio: Catalogo_Servicio;
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private loginService:LoginService){
    this.form = this.formBuilder.group({
      nombre_servicio: ['', Validators.required,],
      url_prod: ['', Validators.required,],
      ip_prod: ['', [Validators.required,Validators.pattern('(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])')]],
      url_des: ['', Validators.required,],
      ip_des: ['',  [Validators.required,Validators.pattern('(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])')]],
      url_test: ['', Validators.required,],
      ip_test: ['',  [Validators.required,Validators.pattern('(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])')]],
      dns: ['', Validators.required,],
      usuario: ['', Validators.required,],
      contrasena: ['', Validators.required,]

    })
    this.numemp = loginService.usuario.NoColaborador;
    this.fecha = new Date().toString();
  }
  enviar(){
    let formValue = this.form.value;
    this.servicio = new Catalogo_Servicio(
      0,
      formValue.nombre_servicio,
      formValue.url_prod,
      formValue.ip_prod,
      formValue.url_des,
      formValue.ip_des,
      formValue.url_test,
      formValue.ip_test,
      formValue.dns,
      formValue.usuario,
      formValue.contrasena,
      this.fecha,
      this.numemp
    );
  }

  MensajeError(nombre_campo:string){
    const campo = this.form.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if(campo?.hasError('pattern')){
      return 'Formato incorrecto'
    }
    return ''
  }
  
  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setErrors(null);
    });
  }
}
