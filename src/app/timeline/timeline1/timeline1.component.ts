import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-timeline1',
    templateUrl: './timeline1.component.html',
    styleUrls: ['./timeline1.component.scss'],
    imports: [BreadcrumbComponent]
})
export class Timeline1Component {
  constructor() {
    // constructor code
  }
}
