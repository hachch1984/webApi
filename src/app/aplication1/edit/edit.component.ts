import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/apiService.service';
import { Persona } from '../../interfaces/Persona';
import { catchError, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {


  errorGeneral = "";
  id = "";

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {





  }
  ngOnInit(): void {


    this.activatedRoute.params.pipe(
      switchMap(params => this.apiService.getById(params['id'])),
    ).subscribe(persona => {

      if (persona) {
        this.id = persona.id!;

        this.myForm.setValue({
          id: persona.id,
          nombres: persona.nombres,
          apellidos: persona.apellidos,
          documentoIdentidad: persona.documentoIdentidad,
          fechaNacimiento: this.formatDate(persona.fechaNacimiento!),
          estado: persona.estado
        });

      }

    });





  }







  myForm = this.fb.group({
    id: [''],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    documentoIdentidad: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    estado: ['', [Validators.required]]

  })!;




  getErrorMessage(controlName: string): string {
    const control = this.myForm.get(controlName);
    if (control && control.touched && control.invalid) {

      if (control.hasError('required')) {
        return 'Este valor es requerido';
      }
      else if (control.hasError('error')) {
        return control.getError("message");
      }
    }
    return '';
  }


  onSubmit(): void {
    this.errorGeneral = "";
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {

      return;
    }

    let persona = this.myForm.value as Persona;
    persona.id = this.id;

    this.apiService.update(persona).subscribe(result => {
 
      if (result.ok == false) {

        for (let key in result.errors) {
          if (key === "id") {
            this.errorGeneral = result.errors[key];
          } else {
            this.myForm.get(key)?.setErrors({ error: true, message: result.data.error.errors[key] });
          }
        }



      } else {
        this.onCancel()
      }



    })


  }



  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }



  onCancel(): void {

    this.route.navigate(['main-layout/aplication1/personas']);
  }



}
