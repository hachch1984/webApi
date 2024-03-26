import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/apiService.service';
import { Persona } from '../../interfaces/Persona';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {


  errorGeneral = "";

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router) {


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


    this.apiService.add(persona).subscribe(result => {

      if (result.ok == false) {

        for (let key in result.errors) {
          if (key === "id") {
            this.errorGeneral = result.errors[key];
          } else {
            this.myForm.get(key)?.setErrors({ error: true, message: result.data.error.errors[key] });
          }
        }



      } else {
        this.onCancel();
      }



    })


  }



  onCancel(): void {

    this.route.navigate(['main-layout/aplication1/personas']);
  }


}
