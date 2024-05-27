import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartPage } from './line-chart.page';
import { AuthService } from 'src/app/service/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LineChartPage', () => {
  let component: LineChartPage;
  let fixture: ComponentFixture<LineChartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineChartPage],
      imports: [HttpClientTestingModule],
    }).compileComponents(); 
    fixture = TestBed.createComponent(LineChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
