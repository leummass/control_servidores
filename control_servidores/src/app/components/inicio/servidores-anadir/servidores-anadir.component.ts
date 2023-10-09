import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VentanaAnadirIpComponent } from './ventana-anadir-ip/ventana-anadir-ip.component';

interface servidor {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-servidores-anadir',
  templateUrl: './servidores-anadir.component.html',
  styleUrls: ['./servidores-anadir.component.css'],
})
export class ServidoresAnadirComponent {

  form: FormGroup;
 
  tipo_serv: servidor[] = [
    { value: 'tipo1', viewValue: 'tipo1' },
    { value: 'tipo2', viewValue: 'tipo2' },
    { value: 'tipo3', viewValue: 'tipo3' },
  ];
  constructor(private formBuilder: FormBuilder, public ventana: MatDialog) {
    this.form = this.formBuilder.group({
      nombre_servidor: ['', Validators.required],
      ip_prod: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      ip_des: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      ip_test: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      ip_drp: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
          ),
        ],
      ],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  enviar() {}
  MensajeError(nombre_campo: string) {
    const campo = this.form.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }
    return '';
  }
  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setErrors(null);
    });
  }

  abrirVentana(tipo_ip: string) {
    const dialogRef = this.ventana.open(VentanaAnadirIpComponent, {
      width:'70%',
      enterAnimationDuration:'300ms',
      exitAnimationDuration:'300ms',
      data: { titulo: tipo_ip },
    });
    if (tipo_ip == 'IP Productiva') {
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result)
        this.form.patchValue({ ip_prod: result.resForm.ip });
      });
    }
    if (tipo_ip == 'IP Tester') {
      dialogRef.afterClosed().subscribe((result) => {
        this.form.patchValue({ ip_test: result.resForm.ip });
      });
    }
    if (tipo_ip == 'IP DRP') {
      dialogRef.afterClosed().subscribe((result) => {
        this.form.patchValue({ ip_drp: result.resForm.ip });
      });
    }
    if (tipo_ip == 'IP Desarrollo') {
      dialogRef.afterClosed().subscribe((result) => {
        this.form.patchValue({ ip_des: result.resForm.ip });
      });
    }
  }
}
