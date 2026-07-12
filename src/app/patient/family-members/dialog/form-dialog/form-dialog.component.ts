import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyMember } from '../../family-members.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  member: FamilyMember;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-family-member-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogClose
],
})
export class FamilyMemberFormComponent {
  dialogRef = inject<MatDialogRef<FamilyMemberFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  memberForm: FormGroup;
  member: FamilyMember;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.member.name;
      this.member = data.member;
    } else {
      this.dialogTitle = 'New Family Member';
      const blankObject = {} as FamilyMember;
      this.member = new FamilyMemberClass(blankObject);
    }
    this.memberForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.member.id],
      name: [this.member.name, [Validators.required]],
      relation: [this.member.relation, [Validators.required]],
      dob: [this.member.dob, [Validators.required]],
      gender: [this.member.gender, [Validators.required]],
      bloodGroup: [this.member.bloodGroup, [Validators.required]],
      phone: [this.member.phone, [Validators.required]],
      email: [this.member.email],
      status: [this.member.status, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.memberForm.valid) {
      this.dialogRef.close(this.memberForm.getRawValue());
    }
  }
}

export class FamilyMemberClass {
  id: number;
  name: string;
  relation: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  status: string;

  constructor(member: FamilyMember) {
    this.id = member.id || 0;
    this.name = member.name || '';
    this.relation = member.relation || '';
    this.dob = member.dob || '';
    this.gender = member.gender || '';
    this.bloodGroup = member.bloodGroup || '';
    this.phone = member.phone || '';
    this.email = member.email || '';
    this.status = member.status || 'Active';
  }
}
