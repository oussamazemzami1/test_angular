import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../table-display/user';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent {
  selectedOption: string = 'all';
  @Input()
  dataSource!: MatTableDataSource<User>;

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue
  }

  change(value: string) {
    if (value === "all") {
      this.dataSource.filter = ""
    }
    if (value === "available") {
      this.dataSource.filter = "true"
    }
    if (value === "notAvailable") {
      this.dataSource.filter = "false"
    }
  }

}
