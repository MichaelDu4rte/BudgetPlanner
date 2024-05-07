import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  // incomes
  lastMonthsIncome = ['Jan: $500', 'Feb: $500', 'Mar: $500'];
  currentMonthIncome = '$1,500.00';

  //expenses
  lastMonthsExpense = ['Jan: $200', 'Feb: $200', 'Mar: $200'];
  currentMonthExpense = '$600';

 

  totalCurrentMonthIncome = 1500;
  totalCurrentMonthExpense = 600;


  constructor(public router : Router) {}

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }

  onTodo() {
    this.router.navigate(['/budget-planner/Expense']);
  }

  get totalCurrentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
