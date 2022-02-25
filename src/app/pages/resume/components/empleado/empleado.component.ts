// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
//Servicios
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmpleadoService } from 'src/app/core/services/empleado.service';
// Modelos
import { Empleado } from 'src/app/core/models/empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  empleado: Empleado = new Empleado();
  seledtedEmpleado: Empleado | null = null;
  empleados: Empleado[] = [];
  formEmpleado!: FormGroup;
  constructor(
    private empleadoService: EmpleadoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  obtenerEmpleados() {
    this.empleadoService.getAll().subscribe({
      next: (array: Empleado[]) => {
        let empleadoList: Empleado[] = [];
        array.forEach((element) => {
          empleadoList.push(element);
        });
        this.empleados = empleadoList.sort(function (a, b) {
          if (a.nombres! > b.nombres!) {
            return 1;
          }
          if (a.nombres! < b.nombres!) {
            return -1;
          }
          return 0;
        });
      },
    });
  }

  guardarEmpleado() {
    this.empleadoService.save(this.empleado).subscribe((empleado: Empleado) => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Correcto!',
        detail: `El empleado ${empleado.nombres} ha sido guardado correctamente`,
      });
      this.validarEmpleado(empleado);
    });
  }
  validarEmpleado(empleado: Empleado) {
    let index = this.empleados.findIndex(
      (e) => e.idEmpleado === empleado.idEmpleado
    );
    if (index != -1) {
      this.empleados[index] = empleado;
    } else {
      this.empleados.push(empleado);
    }
    this.formEmpleado.reset();
  }

  guardarEditarEmpleado(editar: Boolean) {
    if (editar) {
      if (
        this.seledtedEmpleado != null &&
        this.seledtedEmpleado.idEmpleado != null
      ) {
        this.formEmpleado.patchValue(this.seledtedEmpleado);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'No ha seleccionado ningun empleado',
        });
        return;
      }
    } else {
      this.empleado = new Empleado();
    }
  }

  eliminarEmpleado() {
    if (
      this.seledtedEmpleado == null ||
      this.seledtedEmpleado.idEmpleado == null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'No ha seleccionado ningun empleado',
      });
      return;
    }
    this.confirmationService.confirm({
      message: `¿Está seguro que desea elminar el empleado ${this.seledtedEmpleado.nombres}?`,
      accept: () => {
        this.empleadoService
          .delete(this.seledtedEmpleado!.idEmpleado!)
          .subscribe((empleado: Empleado) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Información',
              detail: `El empleado ${empleado.nombres} a sido eliminado Correctamente`,
            });
            this.validarEliminar(empleado);
          });
      },
    });
  }
  validarEliminar(empleado: Empleado) {
    this.empleados.splice(
      this.empleados.findIndex((e) => e.idEmpleado === empleado.idEmpleado),
      1
    );
  }

  onEliminar(empleado: Empleado) {
    this.seledtedEmpleado = empleado;
    this.eliminarEmpleado();
  }

  onEditar(empleado: Empleado) {
    this.seledtedEmpleado = empleado;
    this.guardarEditarEmpleado(true);
  }

  onCancelar() {
    this.formEmpleado.reset();
    this.seledtedEmpleado = null;
  }

  onGuardar() {
    this.empleado = this.formEmpleado.value;
    this.guardarEmpleado();
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.formEmpleado = this.fb.group({
      idEmpleado: new FormControl(),
      dni: new FormControl(null, Validators.required),
      nombres: new FormControl(null, Validators.required),
      telefono: new FormControl(),
      estado: new FormControl(),
      user: new FormControl(null, Validators.required),
    });
  }
}
