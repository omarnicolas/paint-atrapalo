import { Component, Input, HostListener } from '@angular/core';
import { CanvasComponent } from '../../canvas/canvas.component';

@Component({
  selector: 'app-line-weight',
  templateUrl: './line-weight.component.html',
  styleUrls: ['./line-weight.component.css'],
})
export class LineWeightComponent {
  @Input() canvas: CanvasComponent;
  selectedOption: string;

  options = [
    { name: '2px', value: 2 },
    { name: '12px', value: 12 },
    { name: '24px', value: 24 },
    { name: '36px', value: 36 },
    { name: '64px', value: 64 },
  ];

  @HostListener('click')
  click() {
    this.canvas.changeLineWeight(this.selectedOption);
  }
}
