import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-medical-records',
    templateUrl: './medical-records.component.html',
    styleUrls: ['./medical-records.component.scss'],
    imports: [BreadcrumbComponent]
})
export class MedicalRecordsComponent {
  constructor() {
    // constructor code
  }
}
