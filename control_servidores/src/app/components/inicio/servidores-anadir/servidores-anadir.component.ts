import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface servidor {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-servidores-anadir',
  templateUrl: './servidores-anadir.component.html',
  styleUrls: ['./servidores-anadir.component.css']
})
export class ServidoresAnadirComponent {
  form: FormGroup;
  tipo_serv: servidor[] = [
    {value: 'tipo1', viewValue: 'tipo1'},
    {value: 'tipo2', viewValue: 'tipo2'},
    {value: 'tipo3', viewValue: 'tipo3'},
  ];
  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      nombre_servidor: ['', Validators.required,],
      ip_prod: ['', [Validators.required,Validators.pattern('(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])')]],
      ip_des: ['',  [Validators.required,Validators.pattern('(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])')]],
      ip_test: ['',  [Validators.required,Validators.pattern('(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])')]],
      ip_drp: ['',  [Validators.required,Validators.pattern('(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])')]],
      descripcion: ['', Validators.required,],
      tipo: ['', Validators.required,]

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
