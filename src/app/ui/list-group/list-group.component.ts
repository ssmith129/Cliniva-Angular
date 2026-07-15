import { Component , ChangeDetectionStrategy} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-list-group',
    templateUrl: './list-group.component.html',
    styleUrls: ['./list-group.component.scss'],
    imports: [BreadcrumbComponent, MatListModule]
})
export class ListGroupComponent {
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  constructor() {
    // constructor code
  }
}
