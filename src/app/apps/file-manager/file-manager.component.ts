import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import type { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ApexGrid, ApexFill } from 'ng-apexcharts';

export interface ApexChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  fill: ApexFill;
  labels: string[];
}

export interface FileManagerItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc' | 'xls' | 'image' | 'zip';
  size: string;
  sizeInBytes: number;
  updatedAt: string;
  owner: string;
  downloads: number;
}

@Component({
  selector: 'app-file-manager',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    BreadcrumbComponent,
    NgApexchartsModule,
  ],
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  breadscrums = [
    {
      title: 'File Manager',
      items: ['Apps'],
      active: 'File Manager',
    },
  ];

  viewMode: 'grid' | 'list' = 'grid';
  searchText = '';
  selectedCategory: 'all' | 'folder' | 'document' | 'image' | 'media' = 'all';

  // Modal flags
  selectedFile: FileManagerItem | null = null;
  isFileDetailsOpen = false;
  isUploadOpen = false;

  uploadForm: FormGroup;

  items: FileManagerItem[] = [
    {
      id: '1',
      name: 'Patient Records 2026',
      type: 'folder',
      size: '-',
      sizeInBytes: 0,
      updatedAt: '2026-05-24',
      owner: 'Sarah Smith',
      downloads: 0,
    },
    {
      id: '2',
      name: 'MRI Brain Scan - J. Doe',
      type: 'pdf',
      size: '4.2 MB',
      sizeInBytes: 4404019,
      updatedAt: '2026-05-20',
      owner: 'Jens Brincker',
      downloads: 145,
    },
    {
      id: '3',
      name: 'Insurance Claims Log',
      type: 'xls',
      size: '1.8 MB',
      sizeInBytes: 1887436,
      updatedAt: '2026-05-27',
      owner: 'Admin',
      downloads: 82,
    },
    {
      id: '4',
      name: 'Ward 3 Floor Plan',
      type: 'image',
      size: '12.5 MB',
      sizeInBytes: 13107200,
      updatedAt: '2026-04-15',
      owner: 'John Deo',
      downloads: 210,
    },
    {
      id: '5',
      name: 'Consent Form Template',
      type: 'doc',
      size: '840 KB',
      sizeInBytes: 860160,
      updatedAt: '2026-05-28',
      owner: 'Mark Hay',
      downloads: 35,
    },
    {
      id: '6',
      name: 'Lab Report Backups',
      type: 'zip',
      size: '154 MB',
      sizeInBytes: 161480704,
      updatedAt: '2026-05-26',
      owner: 'Sarah Smith',
      downloads: 58,
    },
    {
      id: '7',
      name: 'X-Ray Scans',
      type: 'folder',
      size: '-',
      sizeInBytes: 0,
      updatedAt: '2026-05-18',
      owner: 'Sue Woodger',
      downloads: 0,
    },
    {
      id: '8',
      name: 'Pharmacy Inventory Guide',
      type: 'pdf',
      size: '8.4 MB',
      sizeInBytes: 8808038,
      updatedAt: '2026-05-22',
      owner: 'Jens Brincker',
      downloads: 112,
    },
  ];

  chartOptions!: ApexChartOptions;

  constructor() {
    this.uploadForm = this.fb.group({
      fileName: ['', [Validators.required, Validators.maxLength(50)]],
      fileType: ['pdf', Validators.required],
      fileSize: ['1.2 MB', Validators.required],
    });

    this.chartOptions = {
      series: [75],
      chart: {
        type: 'radialBar',
        height: 200,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: '60%',
          },
          track: {
            background: '#e2e8f0',
            strokeWidth: '55%',
            margin: 5,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '22px',
              fontWeight: '700',
              color: '#6366f1',
              formatter: () => '15 GB',
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#6366f1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      labels: ['Used Space'],
    };
  }

  get usedSpace(): string {
    const totalBytes = this.items.reduce(
      (acc, curr) => acc + curr.sizeInBytes,
      0,
    );
    return (totalBytes / (1024 * 1024)).toFixed(1);
  }

  get usedPercent(): number {
    const maxSpaceMB = 1000;
    return (parseFloat(this.usedSpace) / maxSpaceMB) * 100;
  }

  get filteredItems(): FileManagerItem[] {
    return this.items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      if (this.selectedCategory === 'all') return matchesSearch;
      if (this.selectedCategory === 'folder')
        return item.type === 'folder' && matchesSearch;
      if (this.selectedCategory === 'document')
        return ['pdf', 'doc', 'xls'].includes(item.type) && matchesSearch;
      if (this.selectedCategory === 'image')
        return item.type === 'image' && matchesSearch;
      if (this.selectedCategory === 'media')
        return item.type === 'zip' && matchesSearch;

      return matchesSearch;
    });
  }

  viewDetails(item: FileManagerItem): void {
    this.selectedFile = item;
    this.isFileDetailsOpen = true;
    this.cdr.markForCheck();
  }

  closeDetailsModal(): void {
    this.isFileDetailsOpen = false;
    this.selectedFile = null;
    this.cdr.markForCheck();
  }

  deleteItem(item: FileManagerItem): void {
    this.items = this.items.filter((i) => i.id !== item.id);
    if (this.selectedFile?.id === item.id) {
      this.selectedFile = null;
      this.isFileDetailsOpen = false;
    }
    this.cdr.markForCheck();
  }

  isDragOver = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
    this.cdr.markForCheck();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    this.cdr.markForCheck();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleDroppedFiles(files);
    }
    this.cdr.markForCheck();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleDroppedFiles(input.files);
    }
  }

  handleDroppedFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      let fileType: 'folder' | 'pdf' | 'doc' | 'xls' | 'image' | 'zip' = 'pdf';

      if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(extension)) {
        fileType = 'image';
      } else if (['zip', 'rar', 'tar', 'gz', '7z'].includes(extension)) {
        fileType = 'zip';
      } else if (['xls', 'xlsx'].includes(extension)) {
        fileType = 'xls';
      } else if (['doc', 'docx'].includes(extension)) {
        fileType = 'doc';
      } else if (extension === 'pdf') {
        fileType = 'pdf';
      }

      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

      const newItem: FileManagerItem = {
        id:
          (this.items.length + 1).toString() +
          Math.random().toString(36).substr(2, 4),
        name: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
        type: fileType,
        size: file.size === 0 ? '-' : sizeMB,
        sizeInBytes: file.size,
        updatedAt: new Date().toISOString().split('T')[0],
        owner: 'Admin',
        downloads: 0,
      };

      this.items.unshift(newItem);
    }
    this.isUploadOpen = false;
    this.cdr.markForCheck();
  }

  triggerUpload(): void {
    if (this.uploadForm.invalid) return;

    const val = this.uploadForm.value;
    const mbValue = parseFloat(val.fileSize);
    const bytes = isNaN(mbValue) ? 1048576 : mbValue * 1024 * 1024;

    const newItem: FileManagerItem = {
      id: (this.items.length + 1).toString(),
      name: val.fileName,
      type: val.fileType,
      size: val.fileSize,
      sizeInBytes: bytes,
      updatedAt: new Date().toISOString().split('T')[0],
      owner: 'Admin',
      downloads: 0,
    };

    this.items.unshift(newItem);
    this.isUploadOpen = false;
    this.cdr.markForCheck();
  }

  openUploadModal(): void {
    this.uploadForm.reset({
      fileName: '',
      fileType: 'pdf',
      fileSize: '2.5 MB',
    });
    this.isUploadOpen = true;
    this.cdr.markForCheck();
  }

  closeUploadModal(): void {
    this.isUploadOpen = false;
    this.cdr.markForCheck();
  }
}
