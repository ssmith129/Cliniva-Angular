import { Component, OnInit, inject , ChangeDetectionStrategy} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { SimpleDialogComponent } from './simpleDialog.component';
import { DialogformComponent } from './dialogform/dialogform.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

// import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    imports: [BreadcrumbComponent, MatButtonModule]
})
export class ModalComponent implements OnInit {
  private dialogModel = inject(MatDialog);
  private fb = inject(FormBuilder);

  closeResult = '';

  simpleDialog?: MatDialogRef<SimpleDialogComponent>;
  public fname?: string = 'John';
  public lname?: string = 'Deo';
  public addCusForm?: FormGroup;
  firstName?: string;
  lastName?: string;
  dialogConfig?: MatDialogConfig;
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      IdProof: null,
      firstname: [
        this.fname,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      lastname: [
        this.lname,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      email: [null, [Validators.required, Validators.email]],
    });
  }
  dialog() {
    this.simpleDialog = this.dialogModel.open(SimpleDialogComponent);
  }
  openDialog(): void {
    this.dialogModel.open(DialogformComponent, {
      width: '640px',
      disableClose: true,
    });
  }
}
