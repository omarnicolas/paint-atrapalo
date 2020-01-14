import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['canvas.component.css'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas', null) public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  points: Array<any> = [];
  rePoints: Array<any> = [];

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = 500;
    canvasEl.height = 500;

    this.cx.lineWidth = 1;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // capturamos todos los eventos mousedown del elemento canvas
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(e => {
          return fromEvent(canvasEl, 'mousemove').pipe(
            // pararemos (unsubscribe) una vez el usuario deje el raton
            // trigger 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // trigger 'mouseleave' event
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise nos permite obtener el valor previo, para dibujar
            // una linea desde el punto previo al actual
            pairwise(),
          );
        }),
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top,
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top,
        };

        this.points.push({
          x: prevPos.x,
          y: prevPos.y,
          size: this.cx.lineWidth,
          color: this.cx.strokeStyle,
          mode: 'begin',
        });
        this.points.push({
          x: currentPos.x,
          y: currentPos.y,
          size: this.cx.lineWidth,
          color: this.cx.strokeStyle,
          mode: 'end',
        });
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number },
  ) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  private drawPoints() {
    // eliminamos todo
    this.cx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height,
    );
    // dibujamos todos los puntos
    for (let i = 0; i < this.points.length; i++) {
      const pt = this.points[i];

      let begin = false;

      if (this.cx.lineWidth !== pt.size) {
        this.cx.lineWidth = pt.size;
        begin = true;
      }
      if (this.cx.strokeStyle !== pt.color) {
        this.cx.strokeStyle = pt.color;
        begin = true;
      }
      if (pt.mode === 'begin' || begin) {
        this.cx.beginPath();
        this.cx.moveTo(pt.x, pt.y);
      }
      this.cx.lineTo(pt.x, pt.y);
      if (pt.mode === 'end' || i === this.points.length - 1) {
        this.cx.stroke();
      }
    }
    this.cx.stroke();
  }

  changeLineWeight(width) {
    this.cx.lineWidth = width;
  }

  changeColor(color) {
    this.cx.strokeStyle = color;
  }

  undo() {
    const undoPoints = this.points.pop();
    this.rePoints.push(undoPoints);
    this.drawPoints();
  }

  redo() {
    this.points = this.points.concat(this.rePoints);
    this.rePoints = [];
    this.drawPoints();
  }
}
