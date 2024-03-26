import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/apiService.service';
import { Subscription } from 'rxjs';
import { Persona } from '../../interfaces/Persona';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss'
})
export class PersonasComponent implements OnDestroy {


  personas: Persona[] = [];

  personasGetAllSubscription = new Subscription();

  constructor(private apiService: ApiService, private router: Router) {


    this.personasGetAllSubscription = this.apiService.getAll().subscribe((data: Persona[]) => {
      console.log('data', data);
      this.personas = data;

    });

  }
  ngOnDestroy(): void {
    this.personasGetAllSubscription.unsubscribe();
  }





  estadoDescription(estado: string): string {
    return estado === "A" ? "Activo" : "Inactivo";
  }



  onAgregarNuevaPersona() {
    this.router.navigate(['main-layout/aplication1/add']);
  }

  onEditar(id: string) {
    this.router.navigate(['main-layout/aplication1/edit/', id]);

  }

  
  onEliminar(id: string) {
    console.log(Date());
    this.router.navigate(['main-layout/aplication1/delete/',id ]);
  }

}
