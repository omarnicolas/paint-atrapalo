import { Component, Input, HostListener } from '@angular/core';
import { CanvasComponent } from '../../canvas/canvas.component';

@Component({
  selector: 'app-undo-redo',
  templateUrl: './undo-redo.component.html',
  styleUrls: ['./undo-redo.component.css'],
})
export class UndoRedoComponent {
  @Input() canvas: CanvasComponent;

  undo() {
    this.canvas.undo();
  }

  redo() {
    this.canvas.redo();
  }
}
