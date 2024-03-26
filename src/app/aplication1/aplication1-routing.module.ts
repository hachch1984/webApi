import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { LayoutComponent } from './layout/layout.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component'; 

const routes: Routes = [

  {
    path: '',component:LayoutComponent, children: [
      { path: 'personas', component: PersonasComponent },
      { path: 'add',component:AddComponent },
      { path: 'edit/:id',component:EditComponent },
      { path: 'delete/:id',component:DeleteComponent }, 
      { path: '**', redirectTo: 'personas' }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Aplication1RoutingModule { }
