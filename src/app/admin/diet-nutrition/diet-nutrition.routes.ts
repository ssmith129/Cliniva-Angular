import { Route } from '@angular/router';

export const DIET_NUTRITION_ROUTE: Route[] = [
  {
    path: 'diet-plans',
    loadComponent: () =>
      import('./diet-plans/diet-plans.component').then(
        (m) => m.DietPlansComponent
      ),
  },
  {
    path: 'nutritional-assessment',
    loadComponent: () =>
      import('./nutritional-assessment/nutritional-assessment.component').then(
        (m) => m.NutritionalAssessmentComponent
      ),
  },
];
