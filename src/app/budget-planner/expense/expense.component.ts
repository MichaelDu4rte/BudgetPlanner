import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [SideNavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth : any;

  expenses: {month: string, expenseAmount: number}[] = [
    {month: 'January', expenseAmount: 100},
    {month: 'February', expenseAmount: 100},
    {month: 'March', expenseAmount: 100},
  ];

  januaryExpense : any[] = [
    {expenseType: 'Rent', expenseAmount: 500},
    {expenseType: 'Groceries', expenseAmount: 2500},
  ]

  februaryExpense : any[] = [
    {expenseType: 'Rent', expenseAmount: 500},
    {expenseType: 'Utilities', expenseAmount: 1500},
  ]

  marchExpense : any[] = [
    {expenseType: 'Rent', expenseAmount: 500},
    {expenseType: 'Groceries', expenseAmount: 1500},
  ]

  constructor(public fb: FormBuilder, public router : Router) {
  };

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month : ['', Validators.required],
      expenseType : ['', Validators.required],
      expenseAmount: ['', Validators.required],
    })
  }



  onSubmitExpense() {
   
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpense().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.getFilteredExpense();
  }

  getFilteredExpense() {
    switch(this.selectedMonth) {
      case "January":
        return this.januaryExpense;
      case "February":
        return this.februaryExpense;
      case "March":
        return this.marchExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month : string): number {
    return this.getFilteredExpense().reduce((acc, curr)=> acc + curr.expenseAmount, 0);

  }

  onSave() {
    if(this.expenseForm.valid) {
      this.expenseForm.reset({month: this.selectedMonth});
      this.getFilteredExpense();
    }
  }

  saveForm() {
    
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
