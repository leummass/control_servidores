import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Catalogo_DetalleServidor } from 'src/app/models/catalogo_detalleservidor.model';
import { Catalogo_Servidor } from 'src/app/models/catalogo_servidor.model';
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
  fecha:string;
  servidor:Catalogo_Servidor;
  detalle_drp: Catalogo_DetalleServidor;
  detalle_test: Catalogo_DetalleServidor;
  detalle_prod: Catalogo_DetalleServidor;
  detalle_des: Catalogo_DetalleServidor;

  tipo_serv: servidor[] = [
    { value: 'tipo1', viewValue: 'tipo1' },
    { value: 'tipo2', viewValue: 'tipo2' },
    { value: 'tipo3', viewValue: 'tipo3' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    public ventana: MatDialog,
    public loginService: LoginService,
    public dialogRef: MatDialogRef<ServidoresAnadirComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
    this.fecha = new Date().toString();
  }

  enviar() {
    let formValue = this.form.value;
    this.servidor= new Catalogo_Servidor(
      0,
      0,
      '',
      formValue.nombre_servidor,
      formValue.Tipo,
      '',
      formValue.descripcion,
      this.fecha,
      this.numemp
    );
    this.setFecha();//Actualizar fecha de las ip registradas ya que estaban en ''

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
  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setErrors(null);
    });
  }
  setFecha() {
    this.detalle_des.FechaModificacion = this.fecha;
    this.detalle_drp.FechaModificacion = this.fecha;
    this.detalle_test.FechaModificacion = this.fecha;
    this.detalle_prod.FechaModificacion = this.fecha;
  }

  abrirVentana(tipo_ip: string) {
    const dialogRef = this.ventana.open(VentanaAnadirIpComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { titulo: tipo_ip },
    });
    if (tipo_ip == 'IP Productiva') {
      dialogRef.afterClosed().subscribe((result) => {
        if(result != undefined){
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
          '',
          this.numemp
        );
        this.form.patchValue({ ip_prod: result.resForm.ip });
        }
      });
    }
    if (tipo_ip == 'IP Tester') {
      dialogRef.afterClosed().subscribe((result) => {
        if(result != undefined){
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
          '',
          this.numemp
        );
        this.form.patchValue({ ip_test: result.resForm.ip });
        }
      });
    }
    if (tipo_ip == 'IP DRP') {
      dialogRef.afterClosed().subscribe((result) => {
        if(result != undefined){
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
          '',
          this.numemp
        );
        this.form.patchValue({ ip_drp: result.resForm.ip });
        }
      });
    }
    if (tipo_ip == 'IP Desarrollo') {
      dialogRef.afterClosed().subscribe((result) => {
        if(result != undefined){
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
          '',
          this.numemp
        );
        this.form.patchValue({ ip_des: result.resForm.ip });
        }
      });
    }
  }
}
