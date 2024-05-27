import { Component, Input, OnInit } from '@angular/core';
import { ProductSchema } from 'src/app/types/product.types';

@Component({
  selector: 'ion-poc-table-component',
  templateUrl: './ion-poc-table.component.html',
  styleUrls: ['./ion-poc-table.component.scss'],
})
export class IonPocTableComponent  implements OnInit {
  @Input() headers: string[] = [];
  @Input() rows : Array<ProductSchema> = []; 
  constructor() { }

  ngOnInit() {
    console.log('headers ', this.rows)
  }

}
