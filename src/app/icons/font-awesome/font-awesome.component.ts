import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-font-awesome',
    templateUrl: './font-awesome.component.html',
    styleUrls: ['./font-awesome.component.scss'],
    imports: [BreadcrumbComponent]
})
export class FontAwesomeComponent {
  constructor() {
    // constructor code
  }
}
