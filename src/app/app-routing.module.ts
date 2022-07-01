import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'transactions/:type',
        component: TransactionsComponent
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
