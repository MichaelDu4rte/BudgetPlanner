import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [SideNavComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})

export class IncomeComponent {
  incomeForm: any;
  selectedMonth : any;

  monthSelected: boolean = false;

  januaryIncomes : any[] = [
    {source: 'Salary', amount: 250, investments: '491(k)'},
    {source: 'Freelacing', amount: 250, investments: 'Stocks'},
  ]

  februaryIncomes : any[] = [
    {source: 'Salary', amount: 100, investments: '491(k)'},
    {source: 'Freelacing', amount: 400, investments: 'Stocks'},
  ]

  marchIncomes : any[] = [
    {source: 'Salary', amount: 500, investments: '491(k)'},
  ]

  constructor(public fb: FormBuilder, public router : Router) {
    const currentDate = new Date();

  };

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    })
  }

  onChange(event: any)  {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncomes();

  }

  // calculation total incomes month
  calculateTotalIncome(month : string) : number {
    let totalIncome = 0;

    for(const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }

    return totalIncome;
  }

  // get incomes 
  getIncomesForMonth(month : string) : any[] {
    switch(month) {
      case 'January': 
        return this.januaryIncomes;
      case "February":
        return this.februaryIncomes;
      case "March":
        return this.marchIncomes;
      default:
        return [];
    }
  }

  // filter incomes
  getFilteredIncomes() {
    let filteredIncomes: any[] = [];

    switch(this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes = [...this.februaryIncomes];
        break;
      case 'March':
        filteredIncomes = [...this.marchIncomes];
        break;
      default:
        filteredIncomes = [];
        break;
     
    }

    return filteredIncomes;
  }

  onSubmit() {
   

    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch (this.selectedMonth) {
        case 'January': 
          this.januaryIncomes.push(newIncome);
          break;
        case 'February':
          this.februaryIncomes.push(newIncome);
          break;
        case 'March':
          this.marchIncomes.push(newIncome);
          break;
      }
      
      this.incomeForm.reset();
      this.incomeForm.patchValue({ month: '', source: '', amount: '', investments: '' });
    }
  }

  saveForm() {
    console.log('save')
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
