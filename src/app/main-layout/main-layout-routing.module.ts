import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [

      { path: 'aplication1', loadChildren: () => import('../aplication1/aplication1.module').then(m => m.Aplication1Module) },
      {path:'developer',loadChildren:()=>import('../developer/developer.module').then(m=>m.DeveloperModule) },
      { path: '**', redirectTo: 'aplication1' }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
