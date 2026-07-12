import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-helper-classes',
    templateUrl: './helper-classes.component.html',
    styleUrls: ['./helper-classes.component.scss'],
    imports: [BreadcrumbComponent]
})
export class HelperClassesComponent {
  constructor() {
    // constructor code
  }
}
