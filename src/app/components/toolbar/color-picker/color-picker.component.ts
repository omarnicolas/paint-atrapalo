import { Component, Input, HostListener } from '@angular/core';
import { CanvasComponent } from '../../canvas/canvas.component';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent {
  @Input() canvas: CanvasComponent;
  selectedOption: string;

  options = [
    { name: 'Blue', value: '#3333FF' },
    { name: 'Red', value: '#FF3339' },
    { name: 'Green', value: '#41BB17' },
    { name: 'Yellow', value: '#EEE342' },
    { name: 'Orange', value: '#F9A027' },
    { name: 'Black', value: '#000' },
  ];

  onChange(value) {
    this.selectedOption = value;
  }

  @HostListener('click')
  click() {
    this.canvas.changeColor(this.selectedOption);
  }
}
