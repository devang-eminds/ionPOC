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
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.page.html',
  styleUrls: ['./pie-chart.page.scss'],
})
export class PieChartPage implements OnInit {
  populationData!: PopulationData;
  selectedYear: number = 2024;
  chart: any;
  stateKeys: string[] = [];

  constructor(private http: HttpClient,private populationService : PopulationService) { }

  ngOnInit() {
    this.fetchPopulationData();
  }

  fetchPopulationData() {
    this.populationService.fetchPopulationData().subscribe((data: any) => {
        this.populationData = data.population_data;
        console.table(this.populationData);
        this.stateKeys = Object.keys(this.populationData);
        this.createPieChart();
      });
  }

  createPieChart() {
    const malePopulationData: number[] = [];
    const femalePopulationData: number[] = [];
    const backgroundColors: string[] = [];
  
    this.stateKeys.forEach(state => {
      const index = this.populationData[state].years.indexOf(this.selectedYear);
      if (index !== -1) {
        malePopulationData.push(this.populationData[state].male_population[index]);
        femalePopulationData.push(this.populationData[state].female_population[index]);
        backgroundColors.push(`rgb(123,345,10)`, `rgb(265,166,222)`, `rgb(120,194,156)`, `rgb(60,294,116)`, `rgb(225,294,90)`);
      }
    });
  
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (ctx) {
      if (this.chart) {
        this.chart.data.datasets[0].data = malePopulationData;
        this.chart.data.datasets[1].data = femalePopulationData;
        this.chart.data.datasets[0].backgroundColor = backgroundColors;
        this.chart.update();
      } else {
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.stateKeys,
            datasets: [
              {
                label: 'Male',
                data: malePopulationData,
                backgroundColor: backgroundColors,
              },
              {
                label: 'Female',
                data: femalePopulationData,
                backgroundColor: backgroundColors,
              }
            ]
          },
          options: {
            rotation: 360,
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateRotate: true,
              animateScale: true
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#000'
                }
              },
              tooltip: {
                callbacks: {
                  label: (context: any) => {
                    const label = context.dataset.label || '';
                    const value = context.parsed;
                    return `${label}: ${value}`;
                  }
                },
                usePointStyle: true,
              }
            }
          }
        });
      }
    }
  }
  

  getAvailableYears(): number[] {
    if (!this.populationData) {
      return [];
    }
    
    const years: number[] = [];
    Object.values(this.populationData).forEach((stateData) => {
      stateData.years.forEach((year) => {
        if (!years.includes(year)) {
          years.push(year);
        }
      });
    });
    return years.sort((a, b) => a - b);
  }

  onYearChange() {
    this.createPieChart();
  }
}
