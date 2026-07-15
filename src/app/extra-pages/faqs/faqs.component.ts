import { Component , ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-faqs',
    templateUrl: './faqs.component.html',
    styleUrls: ['./faqs.component.scss'],
    imports: [
        BreadcrumbComponent,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class FaqsComponent {
  constructor() {
    // constructor code
  }
}
