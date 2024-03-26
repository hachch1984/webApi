import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ApiService } from '../../services/apiService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {

 
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


estadoInformation(): string {
    return this.myForm.get('estado')?.value === "A" ? "Activo" : "Inactivo";
}




  myForm = this.fb.group({
    id: [''],
    nombres: [''],
    apellidos: [''],
    documentoIdentidad: [''],
    fechaNacimiento: [''],
    estado: ['']

  })!;


 

  onSubmit(): void {
   

    this.apiService.remove(this.id).subscribe(result => {
 
      
        this.onCancel()
     


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
