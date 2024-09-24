import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumeFormComponent } from "./resume-form/resume-form.component";
import { PreviewContainerComponent } from "./preview-container/preview-container.component";
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResumeFormComponent, PreviewContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  formData: FormGroup | null = null;
  
  rerenderResume( e: FormGroup | any ){
    this.formData = e;
  }

  print(){
    window.print();
  }
}
