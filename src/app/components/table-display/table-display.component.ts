import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './user';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'profil', 'disponibility', 'actions'];
  dataSource: MatTableDataSource<User>;
  data: User[] = [
    { id: 1, name: 'Louis Margot', disponibility: true, profil: 'Développeur' },
    { id: 2, name: 'Pierre larot', disponibility: false, profil: 'Interne' },
    { id: 3, name: 'Jean pierre', disponibility: true, profil: 'Technicien' },
    { id: 4, name: 'Nicolas bobo', disponibility: true, profil: 'Modérateur' },
    { id: 5, name: 'Med Lassad', disponibility: false, profil: 'Superviseur' },
    { id: 6, name: 'Majdi naser', disponibility: true, profil: 'Technicien' },
  ];

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditDialog(item: User) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: item // Pass the item to edit to the dialog
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      const selectedItem = this.data.find((elt) => elt.id === result.id);
      if (selectedItem) {
        selectedItem.disponibility = result.disponibility;
        selectedItem.profil = result.profil;
        selectedItem.name = result.name;
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDetailDialog(item: User) {
    this.dialog.open(DetailDialogComponent, {
      width: '400px',
      data: {
        name: item.name,
        profil: item.profil,
        disponibility: item.disponibility,
        address: '2 avenue david marcel, paris',
        age: 30,
        phoneNumber: '+33 76 46 57 56'
      }
    });
  }

  deleteItem(element: User) {
    this.data = this.data.filter((elt) => elt.id !== element.id);
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }
}
