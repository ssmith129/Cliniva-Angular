import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

interface Drug {
  id: string;
  name: string;
}

interface InteractionResult {
  severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
  severityClass: string;
  title: string;
  description: string;
  alternatives: string;
}

@Component({
  selector: 'app-drug-interaction',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    BreadcrumbComponent,
  ],
  templateUrl: './drug-interaction.component.html',
  styleUrls: ['./drug-interaction.component.scss'],
})
export class DrugInteractionComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  breadscrums = [
    {
      title: 'Drug Interaction Checker',
      items: ['Pharmacy'],
      active: 'Interaction Checker',
    },
  ];

  drugs: Drug[] = [
    { id: '1', name: 'Paracetamol' },
    { id: '2', name: 'Ibuprofen' },
    { id: '3', name: 'Amoxicillin' },
    { id: '4', name: 'Methotrexate' },
    { id: '5', name: 'Atorvastatin' },
    { id: '6', name: 'Amlodipine' },
    { id: '7', name: 'Warfarin' },
    { id: '8', name: 'Insulin Glargine' },
    { id: '9', name: 'Metformin' },
  ];

  selectedDrugs: string[] = [];
  result = signal<InteractionResult | null>(null);

  ngOnInit() {}

  checkInteraction() {
    if (this.selectedDrugs.length < 2) {
      this.showNotification('Please select at least 2 drugs to check interactions.', 'snackbar-warning');
      return;
    }

    const drugNames = this.selectedDrugs.map(id => this.drugs.find(d => d.id === id)?.name || '').sort();

    // Check specific pairs
    if (drugNames.includes('Ibuprofen') && drugNames.includes('Warfarin')) {
      this.result.set({
        severity: 'Severe',
        severityClass: 'bg-soft-danger text-danger border-danger',
        title: 'High Risk of Bleeding',
        description: 'Concomitant use of NSAIDs (Ibuprofen) and anticoagulants (Warfarin) significantly increases the risk of serious gastrointestinal bleeding and hemorrhage.',
        alternatives: 'Consider Paracetamol for mild pain relief instead of Ibuprofen, or consult a physician for alternative therapies.',
      });
    } else if (drugNames.includes('Amoxicillin') && drugNames.includes('Methotrexate')) {
      this.result.set({
        severity: 'Severe',
        severityClass: 'bg-soft-danger text-danger border-danger',
        title: 'Methotrexate Toxicity Risk',
        description: 'Amoxicillin reduces the renal clearance of Methotrexate, potentially leading to elevated serum levels and acute bone marrow toxicity.',
        alternatives: 'Use alternative antibiotics such as Macrolides (Azithromycin) if clinically appropriate.',
      });
    } else if (drugNames.includes('Amlodipine') && drugNames.includes('Atorvastatin')) {
      this.result.set({
        severity: 'Moderate',
        severityClass: 'bg-soft-warning text-warning border-warning',
        title: 'Elevated Atorvastatin Levels',
        description: 'Amlodipine may increase the systemic exposure of Atorvastatin, elevating the risk of myopathy and rhabdomyolysis.',
        alternatives: 'Limit Atorvastatin dosage to a maximum of 20mg daily when co-prescribed with Amlodipine.',
      });
    } else if (drugNames.includes('Ibuprofen') && drugNames.includes('Paracetamol')) {
      this.result.set({
        severity: 'Mild',
        severityClass: 'bg-soft-blue text-blue border-blue',
        title: 'Minor Combination Interaction',
        description: 'No major pharmacokinetic interactions. However, concurrent use of multiple analgesics requires monitoring of total dosage to prevent liver/kidney strain.',
        alternatives: 'Safe under typical therapeutic guidelines. Monitor patient daily dosage limits.',
      });
    } else if (drugNames.includes('Insulin Glargine') && drugNames.includes('Metformin')) {
      this.result.set({
        severity: 'None',
        severityClass: 'bg-soft-green text-green border-green',
        title: 'Synergistic Combination (Safe)',
        description: 'Metformin and Insulin Glargine operate via complementary pathways to improve glycemic control. No adverse drug-drug interactions recorded.',
        alternatives: 'Continue prescription as scheduled. Perform routine blood glucose monitoring.',
      });
    } else {
      // Default fallback: No interaction found
      this.result.set({
        severity: 'None',
        severityClass: 'bg-soft-green text-green border-green',
        title: 'No Known Interactions Found',
        description: 'No drug-drug interaction warnings found in our current clinical database for the selected combination.',
        alternatives: 'Always cross-reference with professional clinical guidelines before finalizing prescriptions.',
      });
    }

    this.cdr.markForCheck();
  }

  reset() {
    this.selectedDrugs = [];
    this.result.set(null);
    this.cdr.markForCheck();
  }

  private showNotification(message: string, styleClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: styleClass,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
