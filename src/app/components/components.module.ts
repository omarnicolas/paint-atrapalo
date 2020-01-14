import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanvasComponent } from './canvas';
import {
  LineWeightComponent,
  ColorPickerComponent,
  UndoRedoComponent,
} from './toolbar';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    CanvasComponent,
    LineWeightComponent,
    ColorPickerComponent,
    UndoRedoComponent,
  ],
  exports: [
    CanvasComponent,
    LineWeightComponent,
    ColorPickerComponent,
    UndoRedoComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
