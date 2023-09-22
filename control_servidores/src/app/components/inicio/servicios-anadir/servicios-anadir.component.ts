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
      ip_prod: ['', Validators.required,],
      url_des: ['', Validators.required,],
      ip_des: ['', Validators.required,],
      url_test: ['', Validators.required,],
      ip_test: ['', Validators.required,],
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
    return ''
  }
  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setErrors(null);
    });
  }
}
