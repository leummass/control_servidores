import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Catalogo_DetalleServidor } from 'src/app/models/catalogo_detalleservidor.model';
import { Catalogo_Servidor } from 'src/app/models/catalogo_servidor.model';
import { DatosService } from 'src/app/services/datos.service';
import { LoginService } from 'src/app/services/login.service';
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
  numemp: string;
  servidor: Catalogo_Servidor;
  detalle_drp: Catalogo_DetalleServidor;
  detalle_test: Catalogo_DetalleServidor;
  detalle_prod: Catalogo_DetalleServidor;
  detalle_des: Catalogo_DetalleServidor;

  tipo_serv: any[] = [
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    public ventana: MatDialog,
    private datosService: DatosService,
    public loginService: LoginService,
    public dialogRef: MatDialogRef<ServidoresAnadirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.detalle_des = data.detalle_serv_des;
    this.detalle_test = data.detalle_serv_test;
    this.detalle_prod = data.detalle_serv_prod;
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
    this.numemp = loginService.usuario.NoColaborador;
  }

  enviar() {
    let formValue = this.form.value;
    this.servidor = new Catalogo_Servidor(
      0,
      0,
      '',
      formValue.nombre_servidor,
      formValue.Tipo,
      '',
      formValue.descripcion,
      this.setFecha(),
      this.numemp
    );
    this.setFecha(); //Actualizar fecha de las ip registradas ya que estaban en ''
    this.dialogRef.close({
      detalle_servidor_des: this.detalle_des,
      detalle_servidor_test: this.detalle_test,
      detalle_servidor_prod: this.detalle_prod,
    });

    //Añadir servidor a catalogo_servidor
    const params = {Nombre: this.servidor.Nombre, Descripcion: this.servidor.Descripcion, Tipo:this.servidor.Tipo, NoColaborador: this.numemp}
    let idservidor = this.datosService.addServidor(params)

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
  resetForm(tipo: string) {
    if (tipo == 'anadir') {
      this.form.reset();
    }
    if (tipo == 'editar') {
      this.form.controls['nombre_servidor'].setValue('');
      this.form.controls['descripcion'].setValue('');
    }
  }
  setFecha() {
    return new Date().toString();
  }

  abrirVentana(tipo_ip: string) {
    let datas;
    datas = { titulo: tipo_ip};
    if (tipo_ip == 'IP Productiva' && this.detalle_prod != undefined) {
      datas= { titulo: tipo_ip, servidor: this.detalle_prod };
    }
    if (tipo_ip == 'IP Tester' && this.detalle_test != undefined) {
      datas= { titulo: tipo_ip, servidor: this.detalle_test};
    }
    if (tipo_ip == 'IP Desarrollo' && this.detalle_des != undefined) {
      datas= { titulo: tipo_ip, servidor: this.detalle_des};
    }
    const dialogRef = this.ventana.open(VentanaAnadirIpComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: datas,
    });
    if (tipo_ip == 'IP Productiva') {
      dialogRef.afterClosed().subscribe((result) => {
        if (result != undefined) {
          this.detalle_prod = new Catalogo_DetalleServidor(
            0,
            0,
            result.resForm.ip,
            result.resForm.dns,
            result.resForm.tipo_serv,
            result.resForm.version,
            result.resForm.estatus,
            result.resForm.hostname,
            result.resForm.sistema_operativo,
            result.resForm.ver_so,
            result.resForm.ver_bd,
            this.setFecha(),
            this.numemp
          );
          this.form.patchValue({ ip_prod: result.resForm.ip });
        }
      });
    }
    if (tipo_ip == 'IP Tester') {
      dialogRef.afterClosed().subscribe((result) => {
        if (result != undefined) {
          this.detalle_test = new Catalogo_DetalleServidor(
            0,
            0,
            result.resForm.ip,
            result.resForm.dns,
            result.resForm.tipo_serv,
            result.resForm.version,
            result.resForm.estatus,
            result.resForm.hostname,
            result.resForm.sistema_operativo,
            result.resForm.ver_so,
            result.resForm.ver_bd,
            this.setFecha(),
            this.numemp
          );
          this.form.patchValue({ ip_test: result.resForm.ip });
        }
      });
    }
    if (tipo_ip == 'IP DRP') {
      dialogRef.afterClosed().subscribe((result) => {
        if (result != undefined) {
          this.detalle_drp = new Catalogo_DetalleServidor(
            0,
            0,
            result.resForm.ip,
            result.resForm.dns,
            result.resForm.tipo_serv,
            result.resForm.version,
            result.resForm.estatus,
            result.resForm.hostname,
            result.resForm.sistema_operativo,
            result.resForm.ver_so,
            result.resForm.ver_bd,
            this.setFecha(),
            this.numemp
          );
          this.form.patchValue({ ip_drp: result.resForm.ip });
        }
      });
    }
    if (tipo_ip == 'IP Desarrollo') {
      dialogRef.afterClosed().subscribe((result) => {
        if (result != undefined) {
          this.detalle_des = new Catalogo_DetalleServidor(
            0,
            0,
            result.resForm.ip,
            result.resForm.dns,
            result.resForm.tipo_serv,
            result.resForm.version,
            result.resForm.estatus,
            result.resForm.hostname,
            result.resForm.sistema_operativo,
            result.resForm.ver_so,
            result.resForm.ver_bd,
            this.setFecha(),
            this.numemp
          );
          this.form.patchValue({ ip_des: result.resForm.ip });
        }
      });
    }
  }
}
