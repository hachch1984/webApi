import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: 'main-layout', loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule) },
  
  { path: '**', redirectTo: 'main-layout' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
