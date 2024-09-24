import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [FormsModule, NgxEditorModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['code'],
    ['ordered_list', 'bullet_list'],
    ['link'],
  ];
  @Input() id = 0;
  title = 'Section Title';
  html = 'Hello world!';
  @Output() dataEmitter = new EventEmitter<{sectionId:number,
    sectionTitle:string,
    sectionHTML:string}>();
  
  ngOnInit(): void {
    console.log(this.id);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  handleTitleChange(event: string){
    this.title = event;
    this.emitData();
  }

  handleHTMLChange(event: string){
    this.html = event;
    this.emitData();
  }

  emitData() {    
    this.dataEmitter.emit({
      sectionId: this.id,
      sectionTitle: this.title,
      sectionHTML: this.html
    });
  }
}
