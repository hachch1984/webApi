import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Aplication1RoutingModule } from './aplication1-routing.module';
import { PersonasComponent } from './personas/personas.component';
import { LayoutComponent } from './layout/layout.component';
import { AddComponent } from './add/add.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component'; 


@NgModule({
  declarations: [
    PersonasComponent,
    LayoutComponent,
    AddComponent,
    EditComponent,
    DeleteComponent, 
  ],
  imports: [
    CommonModule,
    Aplication1RoutingModule,
    ReactiveFormsModule,
  ]
})
export class Aplication1Module { }
