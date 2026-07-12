import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-timeline2',
    templateUrl: './timeline2.component.html',
    styleUrls: ['./timeline2.component.scss'],
    imports: [BreadcrumbComponent]
})
export class Timeline2Component {
  constructor() {
    // constructor code
  }
}
