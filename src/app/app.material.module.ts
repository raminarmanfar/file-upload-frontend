import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';






import {
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
} from '@angular/material';


@NgModule({
  imports: [
      MatFormFieldModule,
      MatButtonModule, 
      MatCheckboxModule,
      MatInputModule,
      ReactiveFormsModule,
      MatOptionModule,
      MatSelectModule,
      BrowserAnimationsModule,
      MatTabsModule,
      MatTableModule,
      MatCardModule,
      MatGridListModule,
      MatDividerModule,
      MatListModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatDialogModule
    ],
  exports: [
      MatFormFieldModule,
      MatButtonModule, 
      MatCheckboxModule,
      MatInputModule,
      ReactiveFormsModule,
      MatOptionModule,
      MatSelectModule,
      BrowserAnimationsModule,
      MatTabsModule,
      MatTableModule,
      MatCardModule,
      MatGridListModule,
      MatDividerModule,
      MatListModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatDialogModule
    ],
})
export class MaterialModule { }