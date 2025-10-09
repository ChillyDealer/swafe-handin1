import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AddCreditCard } from './pages/add-credit-card/add-credit-card';
import { Transactions } from './pages/transactions/transactions';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'add-card', component: AddCreditCard },
  { path: 'transactions', loadComponent: () => import('./pages/transactions/transactions').then(m => m.Transactions) },
  { path: '**', redirectTo: '' }
];
