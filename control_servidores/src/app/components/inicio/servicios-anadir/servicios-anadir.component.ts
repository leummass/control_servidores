import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-servicios-anadir',
  templateUrl: './servicios-anadir.component.html',
  styleUrls: ['./servicios-anadir.component.css']
})
export class ServiciosAnadirComponent {
  form: FormGroup;
  numemp: number;
  cargando: boolean = false;
  constructor(private formBuilder: FormBuilder){
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
  }
  enviar(){

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
