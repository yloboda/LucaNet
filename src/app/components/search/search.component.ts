import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Transaction } from '../../models/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public transactions: Transaction[] = [];
  public types: string[] = [];
  public isErrorMessage: boolean = false;

  public typeForm: FormGroup = new FormGroup({
    'type': new FormControl('', Validators.required),
  });

  constructor(
    private bookingService: BookingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.bookingService.getTypeList().subscribe(types => {
      this.types = types && types.length ?
        types.map(item => item.charAt(0).toUpperCase() + item.slice(1)) :
        [];
    });
  }

  transactionTypeSearch() {
    this.isErrorMessage = false;

    if(this.typeForm?.valid) {
      const type: string = this.typeForm.get('type')?.value;

      this.bookingService.getTransactionsIdsByType(type).subscribe(ids => {
        this.transactions = this.bookingService.transactions.filter(item => ids.some(id => item.parent_id === id));
      });

      if(this.transactions && this.transactions.length) {
        this.router.navigate(['transactions', type]);
      } else {
        this.isErrorMessage = true;
      }
    }
  }

}
