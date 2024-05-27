import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './screeens/login/login.page';
// import { SignupComponent } from './signup/signup.component';
import { RegistrationPage } from './screeens/registration/registration.page';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./screeens/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screeens/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./screeens/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'pieChart',
        loadChildren: () =>
          import('./screeens/pie-chart/pie-chart-routing.module').then(
            (m) => m.PieChartPageRoutingModule
          ),
      },
      {
        path: 'lineChart',
        loadChildren: () =>
          import('./screeens/line-chart/line-chart-routing.module').then(
            (m) => m.LineChartPageRoutingModule
          ),
      },
      {
        path: 'barChart',
        loadChildren: () =>
          import('./screeens/bar-chart/bar-chart-routing.module').then(
            (m) => m.BarChartPageRoutingModule
          ),
      }
    ],
  },
  {
    path: 'pie-chart',
    loadChildren: () => import('./screeens/pie-chart/pie-chart.module').then( m => m.PieChartPageModule)
  },
  {
    path: 'pie-chart',
    loadChildren: () => import('./screeens/line-chart/line-chart.module').then( m => m.LineChartPageModule)
  },
  {
    path: 'bar-chart',
    loadChildren: () => import('./screeens/bar-chart/bar-chart.module').then( m => m.BarChartPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
