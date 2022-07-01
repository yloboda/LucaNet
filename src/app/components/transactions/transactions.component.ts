import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Transaction } from '../../models/transaction';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public transactions: Transaction[] = [];
  public displayedColumns: string[] = ['select', 'amount', 'currency', 'type', 'btns'];
  public dataSource = new MatTableDataSource<Transaction>();
  public selection = new SelectionModel<Transaction>(true, []);
  public type: string = '';
  public isSameCurrency: boolean = true;
  public isDataSelected: boolean = true;
  public transactionsSum: number | null = null;
  public currentCurrency: string = '';
  public isSelectedMoreThanOne: boolean = true;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });

    this.bookingService.getTransactionsIdsByType(this.type).subscribe(ids => {
      this.transactions = this.bookingService.transactions.filter(item => ids.some(id => item.parent_id === id));
    });

    this.setupDataSource(this.transactions)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  editTransaction($event: any, element: Transaction) {
    $event.preventDefault();
    $event.stopPropagation();

    const transactionModal = this.dialog.open(TransactionModalComponent, {
      height: '253px',
      width: '640px',
      autoFocus: false,
      data: { transaction: element }
    });

    transactionModal.afterClosed().subscribe(newValues => {
      if (!newValues) { return; }

      this.bookingService.updateTransaction(this.transactions, newValues).subscribe(transactions => {
        this.transactions = transactions;
        this.setupDataSource(this.transactions);
      })
    });
  }

  setupDataSource(transactions: Transaction[]) {
    this.dataSource = new MatTableDataSource<Transaction>(transactions);
    this.selection.clear();
    this.cd.detectChanges();
  }

  validateTransactions() {
    this.transactionsSum = null;
    this.isSelectedMoreThanOne = !!this.selection.selected.length && this.selection.selected.length > 1;

    this.isDataSelected = !!this.selection.selected.length;
    this.isSameCurrency = this.selection.selected.every( (item, i, transactions) => item.currency === transactions[0].currency );
  }

  calculateSum() {
    this.validateTransactions();

    if(this.isSameCurrency && this.isDataSelected && this.isSelectedMoreThanOne) {
      this.bookingService.calculateTransactionSum(this.selection.selected).subscribe(sum => {
        this.transactionsSum = sum;
        this.currentCurrency = this.selection.selected[0].currency;
      });
    }
  }
}
