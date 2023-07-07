import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../table-display/user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  userForm: FormGroup;

  profils: string[] = [
    'Développeur',
    'Interne',
    'Technicien',
    'Modérateur',
    'Superviseur',
  ];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    this.userForm = this._fb.group({
      name: data.name,
      profil: data.profil,
      disponibility: data.disponibility,
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      this._dialogRef.close({ id: this.data.id, ...this.userForm.value });
    }
  }
}
