import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { PromptsService } from 'src/app/services/prompts.service';
import * as alertyfy from 'alertifyjs';
import { FormGroup,  FormControl,  Validators } from '@angular/forms';
import { Prompts } from 'src/app/models/prompts';

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.css']
})
export class PromptsComponent implements OnInit {
  isFormVisible = false;
  isEdit = false;
  prompts: any;
  user: any;
  formData = new FormGroup({
    id_indicacion: new FormControl(0),
    nombre: new FormControl('', Validators.required),
    tipo: new FormControl('E', Validators.required),
    instruccion: new FormControl(''),
    valor: new FormControl(''),
    cantidad: new FormControl(1),
    etiqueta: new FormControl('', Validators.required)
 });

  constructor(private storageService: StorageService, private route: Router, private promptService: PromptsService) {
    this.validarSesion();
    this.getData();
  }

  ngOnInit() {

  }
  
  validarSesion() {
    if (!this.storageService.isLoggedIn()) {
      this.route.navigate(['/']);  
    } else {
      this.user = this.storageService.getUser();
    }
  }

  getData() {
    this.prompts = [];

    this.promptService.obtenerDato(this.user.id_usuario).subscribe((resp) => {
      if (!resp.error) {
        this.prompts = resp.data;
      } else {
        alertyfy.error(resp.mensajeError);
      }
    },
    (error) => {
      alertyfy.error("A ocurrido un error intente más tarde.");
    });
  }

  save(propmt: any) {   
    if (propmt.id_indicacion > 0) {
      let nuevo: Prompts = {
        id_indicacion: propmt.id_indicacion,
        id_usuario: this.user.id_usuario,
        nombre: propmt.nombre,
        tipo: propmt.tipo,
        instruccion: propmt.instruccion,
        valor: propmt.valor,
        cantidad: propmt.cantidad,
        etiqueta: propmt.etiqueta.split(",")
      };

      this.promptService.edit(nuevo).subscribe(data => {
        if (!data.error) {  
          this.isFormVisible = false;
          this.getData();
        } else {          
          alertyfy.error(data.mensajeError);
        } 
      },
      error => {
        alertyfy.error("A ocurrido un error intente más tarde.");
      }
    );
    } else {
      let nuevo: Prompts = {
        id_indicacion: 0,
        id_usuario: this.user.id_usuario,
        nombre: propmt.nombre,
        tipo: propmt.tipo,
        instruccion: propmt.instruccion,
        valor: propmt.valor,
        cantidad: propmt.cantidad,
        etiqueta: propmt.etiqueta.split(",")
      };
      this.promptService.register(nuevo).subscribe(data => {
          if (!data.error) {  
            this.isFormVisible = false;
            this.getData();
          } else {          
            alertyfy.error(data.mensajeError);
          } 
        },
        error => {
          alertyfy.error("A ocurrido un error intente más tarde.");
        }
      );
    }
  }

  edit(propmt: any) {
    this.formData.controls['id_indicacion'].setValue(propmt.id_indicacion);
    this.formData.controls['nombre'].setValue(propmt.nombre);
    this.formData.controls['tipo'].setValue(propmt.tipo);
    this.formData.controls['instruccion'].setValue(propmt.instruccion);
    this.formData.controls['valor'].setValue(propmt.valor);
    this.formData.controls['cantidad'].setValue(propmt.cantidad);
    this.formData.controls['etiqueta'].setValue(propmt.etiqueta);
    this.isEdit = true;
    this.isFormVisible = true;
  }

  deleteP(propmt: any) {
    this.promptService.delete(propmt).subscribe(data => {
        if (!data.error) {  
          this.isFormVisible = false;
          this.getData();
        } else {          
          alertyfy.error(data.mensajeError);
        } 
      },
      error => {
        alertyfy.error("A ocurrido un error intente más tarde.");
      }
    );
  }

  run(propmt: any) {
    alert('Ejecutando')
  }
}
