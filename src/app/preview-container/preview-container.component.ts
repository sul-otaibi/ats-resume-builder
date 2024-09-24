import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-container',
  standalone: true,
  imports: [NgFor],
  templateUrl: './preview-container.component.html',
  styleUrl: './preview-container.component.css',
  inputs: ['formData']
})
export class PreviewContainerComponent {
  formData: FormGroup | null = null;
}
