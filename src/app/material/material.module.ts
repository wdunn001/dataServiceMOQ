import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule } from '@angular/material';

export const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatIconModule
];
@NgModule({
  imports: materialModules,
  exports: materialModules
})

export class MaterialModule { }
