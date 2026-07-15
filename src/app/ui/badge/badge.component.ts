import { Component , ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    imports: [
        BreadcrumbComponent,
        MatBadgeModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class BadgeComponent {
  constructor() {
    // constructor code
  }
}
