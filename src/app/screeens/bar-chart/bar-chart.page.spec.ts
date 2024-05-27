import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartPage } from './bar-chart.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BarChartPage', () => {
  let component: BarChartPage;
  let fixture: ComponentFixture<BarChartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartPage],
      imports: [HttpClientTestingModule],
    }).compileComponents(); 

    fixture = TestBed.createComponent(BarChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
