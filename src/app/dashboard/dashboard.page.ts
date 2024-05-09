import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  banners: any[] = [];
  cards: any[] = [];
  isLoading: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.http.get<any>('assets/data/dashboard.json').subscribe((data) => {
      this.banners = data.banners;
      this.cards = data.cards;
      this.isLoading = false;
    });
  }
}
