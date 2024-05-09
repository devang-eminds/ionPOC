import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPage],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
