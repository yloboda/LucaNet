import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {BookingService} from "../../../services/booking.service";
import {Currency} from "../../../models/currency";

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent implements OnInit {
  public types: string[] = [];
  public currencies: Currency[] = []

  transactionForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<TransactionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    this.bookingService.getTypeList().subscribe(types => {
      this.types = types;
    });

    this.bookingService.getCurrencyList().subscribe(currencies => {
      this.currencies = currencies;
    });

    if(this.data && this.data.transaction) {
      this.setupDefaultFormValues();
    }
  }

  setupDefaultFormValues() {
    this.transactionForm.get('type')?.setValue(this.data.transaction.type);
    this.transactionForm.get('amount')?.setValue(this.data.transaction.amount);
    this.transactionForm.get('currency')?.setValue(this.data.transaction.currency);
  }

  submit() {
    const {
      type,
      amount,
      currency
    } = this.transactionForm.value;
    let newValues = {type, amount: Number(amount), currency, parent_id: this.data.transaction.parent_id}
    this.dialogRef.close(newValues);
  }

  cancel() {
    this.dialogRef.close();
  }

}
