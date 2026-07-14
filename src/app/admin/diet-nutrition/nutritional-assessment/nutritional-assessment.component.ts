import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AiService } from '@core/service/ai.service';

@Component({
  selector: 'app-nutritional-assessment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BreadcrumbComponent
  ],
  templateUrl: './nutritional-assessment.component.html',
  styleUrls: ['./nutritional-assessment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionalAssessmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);

  assessmentForm!: FormGroup;
  isAiLoading = signal<boolean>(false);
  generatedPlan = signal<string>('');

  ngOnInit() {
    const patientParam = this.route.snapshot.queryParamMap.get('patient') || '';
    
    this.assessmentForm = this.fb.group({
      patientName: [patientParam, [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      targetCalories: ['1800', [Validators.required, Validators.min(1000)]],
      isDiabetic: [false],
      isHypertensive: [false],
      isRenalRestricted: [false],
      hasGlutenAllergy: [false],
    });
  }

  generateDietPlan() {
    if (this.assessmentForm.invalid) {
      this.snackBar.open('Please fill out all required fields first.', 'Close', { duration: 3000 });
      return;
    }

    const val = this.assessmentForm.value;
    const conditions = [];
    if (val.isDiabetic) conditions.push('Diabetic');
    if (val.isHypertensive) conditions.push('Hypertension');
    if (val.isRenalRestricted) conditions.push('Renal Restricted');
    if (val.hasGlutenAllergy) conditions.push('Gluten Free');
    const conditionStr = conditions.length > 0 ? conditions.join(', ') : 'None';

    this.isAiLoading.set(true);

    const prompt = `Act as an expert hospital dietician. Generate a detailed, clinical 7-day diet meal plan for a patient with these parameters:
    - Patient Name: ${val.patientName}
    - Age: ${val.age} years
    - Weight: ${val.weight} kg
    - Height: ${val.height} cm
    - Daily Target Calories: ${val.targetCalories} kcal
    - Clinical Conditions/Restrictions: ${conditionStr}

    Format the response with clear headers for Days (Day 1 to Day 7) and suggest specific options for Breakfast, Lunch, Dinner, and a light Snack. Include a short closing dietician remark at the end.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.generatedPlan.set(res);
        this.isAiLoading.set(false);
        this.snackBar.open('AI Nutritional Diet Plan generated!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
      },
      error: () => {
        this.isAiLoading.set(false);
        // Fallback demo plan
        this.generatedPlan.set(this.getDemoDietPlan(val.patientName, val.targetCalories, conditionStr));
        this.snackBar.open('Generated demo diet plan (offline mode).', 'Close', { duration: 3000 });
      }
    });
  }

  getDemoDietPlan(name: string, cals: number, conditions: string): string {
    return `### Clinical Diet Plan for ${name}
**Target Intake:** ${cals} kcal/day
**Special Restrictions:** ${conditions}

**Daily Structure:**
*   **Breakfast (08:00 AM):** Oatmeal with unsweetened almond milk, chia seeds, and half banana. (approx. 350 kcal)
*   **Lunch (01:00 PM):** Grilled chicken breast (150g) with quinoa (1 cup) and steamed broccoli. (approx. 500 kcal)
*   **Snack (04:30 PM):** A handful of raw walnuts or plain greek yogurt. (approx. 200 kcal)
*   **Dinner (08:00 PM):** Baked salmon fillet with sweet potato mash and leafy green salad with olive oil dressing. (approx. 550 kcal)

**Dietician Remarks:**
Ensure patient maintains hydration levels by consuming at least 2.5 liters of water daily. Avoid added processed sugars and refined sodium.`;
  }
}
