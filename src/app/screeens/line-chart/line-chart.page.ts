import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { PopulationService } from 'src/app/service/population/population.service';

interface PopulationData {
  [key: string]: {
    years: number[];
    male_population: number[];
    female_population: number[];
  };
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.page.html',
  styleUrls: ['./line-chart.page.scss'],
})
export class LineChartPage implements OnInit {
  populationData!: PopulationData;
  selectedState: string = '';
  selectedYear: number = 2024;
  chart: any;
  stateKeys: string[] = [];

  constructor(private http: HttpClient, private populationService : PopulationService) { }

  ngOnInit() {
    this.fetchPopulationData();
  }

  fetchPopulationData() {
    this.populationService.fetchPopulationData().subscribe((data: any) => {
      this.populationData = data.population_data;
      this.stateKeys = Object.keys(this.populationData);
      this.selectedState = this.stateKeys[0]; 
      this.createLineChart();
    });
  }

  createLineChart() {
    const maleData = this.populationData[this.selectedState].male_population;
    const femaleData = this.populationData[this.selectedState].female_population;
    const years = this.populationData[this.selectedState].years;

    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            {
              label: 'Male Population',
              data: maleData,
              borderColor: 'blue',
              fill: false
            },
            {
              label: 'Female Population',
              data: femaleData,
              borderColor: 'red',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              // position: 'bottom',
              labels: {
                color: '#000'
              }
            }
          },
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
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
    this.createLineChart();
  }
}
