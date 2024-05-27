import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

interface PopulationData {
  [key: string]: {
    years: number[];
    male_population: number[];
    female_population: number[];
  };
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.page.html',
  styleUrls: ['./bar-chart.page.scss'],
})
export class BarChartPage implements OnInit {
  populationData!: PopulationData;
  selectedState: string = '';
  selectedYear: number = 2024;
  chart: any;
  stateKeys: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPopulationData();
  }

  fetchPopulationData() {
    this.http.get('https://mocki.io/v1/871eb4a4-7bd2-4587-a9a9-d3528262f0f0')
      .subscribe((data: any) => {
        this.populationData = data.population_data;
        console.table(this.populationData);
        this.stateKeys = Object.keys(this.populationData);
        this.selectedState = this.stateKeys[0]; 
        this.createBarChart();
      });
  }

  createBarChart() {
    const maleData = this.populationData[this.selectedState].male_population;
    const femaleData = this.populationData[this.selectedState].female_population;
    const years = this.populationData[this.selectedState].years;

    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [
            {
              label: 'Male Population',
              data: maleData,
              backgroundColor: 'blue'
            },
            {
              label: 'Female Population',
              data: femaleData,
              backgroundColor: 'red'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#000'
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year',
                color: 'white'
              },
              ticks: {
                color: 'white'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Population',
                color: 'white'
              },
              ticks: {
                color: 'white'
              }
            }
          }
        }
      });
    }
  }

  onStateChange() {
    this.createBarChart();
  }
}
