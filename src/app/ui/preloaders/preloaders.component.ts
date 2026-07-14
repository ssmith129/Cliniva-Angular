import { Component , ChangeDetectionStrategy} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-preloaders',
    templateUrl: './preloaders.component.html',
    styleUrls: ['./preloaders.component.scss'],
    imports: [BreadcrumbComponent, MatProgressSpinnerModule]
})
export class PreloadersComponent {
  constructor() {
    // constructor code
  }
}
