import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Catalogo_DetalleServidor } from 'src/app/models/catalogo_detalleservidor.model';



@Component({
  selector: 'app-ventana-anadir-ip',
  templateUrl: './ventana-anadir-ip.component.html',
  styleUrls: ['./ventana-anadir-ip.component.css']
})
export class VentanaAnadirIpComponent {
  formValue:any;
  form: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<VentanaAnadirIpComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      console.log(data)
      this.form = this.formBuilder.group({
        ip: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
            ),
          ],
        ],
        dns: ['', Validators.required,],
        tipo_serv: ['', Validators.required,],
        version: ['', Validators.required,],
        estatus: ['', Validators.required,],
        hostname: ['', Validators.required,],
        sistema_operativo: ['', Validators.required,],
        ver_so: ['', Validators.required,],
        ver_bd: ['', Validators.required,],
      })
    }
    
  cerrarVentana(){
    this.dialogRef.close({ resForm: this.form.value});
  }
  enviar2(){

  }

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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
