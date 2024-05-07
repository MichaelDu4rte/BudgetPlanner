import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})

export class SideNavComponent {
  isSlideOut = true;

  constructor(private router : Router) {}
 
  toggleSlideOut(): void {
    this.isSlideOut = !this.isSlideOut;
  }

  onDash() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }

  onLogout() {
    this.router.navigate(['/budget-planner/login']);
  }
}
