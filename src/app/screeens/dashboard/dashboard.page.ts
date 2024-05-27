import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../service/products/products.service'
import { ProductSchema } from 'src/app/types/product.types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  banners: any[] = [];
  cards: any[] = [];
  isLoading: boolean = false;
  products: ProductSchema[] = [];
  productsTableHeaders = ['title', 'price', 'category'];
  constructor(private http: HttpClient,private productsService: ProductsService, private router : Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    const dashboardData =  require('../../../assets/data/dashboard.json');

      this.banners = dashboardData.banners;
      this.cards = dashboardData.cards;
    // });
    this.productsService.getProducts({limit : 5}).subscribe(products => {
      this.products = products;
      console.log(JSON.stringify(products))
      this.isLoading = false;

    });
  }


  navigateToChart(navigation: string){
    this.router.navigate(['app/'+ navigation])
  }
}



