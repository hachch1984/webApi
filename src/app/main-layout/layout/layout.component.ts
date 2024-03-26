import { Component } from '@angular/core';

@Component({
  selector: 'mainLayout-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {


  layoutMenuType: LayoutMenuType = LayoutMenuType.canvas;

 
  isCanvas(): boolean {
    return this.layoutMenuType === LayoutMenuType.canvas;
  }



}





export enum LayoutMenuType {
  canvas = "canvas",
  traditionalMenu = "traditionalMenu",

}

