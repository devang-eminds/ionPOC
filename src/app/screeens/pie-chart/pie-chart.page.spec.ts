import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartPage } from './pie-chart.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PieChartPage', () => {
  let component: PieChartPage;
  let fixture: ComponentFixture<PieChartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartPage],
      imports: [HttpClientTestingModule],
    }).compileComponents(); 
    fixture = TestBed.createComponent(PieChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
