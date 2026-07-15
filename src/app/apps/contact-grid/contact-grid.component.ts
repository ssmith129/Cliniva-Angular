import { Component , ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-contact-grid',
    templateUrl: './contact-grid.component.html',
    styleUrls: ['./contact-grid.component.scss'],
    imports: [BreadcrumbComponent, MatButtonModule]
})
export class ContactGridComponent {
  constructor() {
    // constructor code
  }
}
