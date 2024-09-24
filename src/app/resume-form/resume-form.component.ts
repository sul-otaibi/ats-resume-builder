import { Component, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { SectionComponent } from "../section/section.component";


@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgxEditorModule, SectionComponent, FormsModule],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css'
})
export class ResumeFormComponent implements OnInit {
  form: FormGroup<any> = new FormGroup({});
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['code'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h3'] }],
    ['link'],
  ];
  onFormDataChange = output<FormGroup>();

  constructor(private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    if(localStorage.getItem('form'))
      this.parseFormFromLocalStorage(localStorage.getItem('form')!);
    else{
      this.form = this.formBuilder.group({
        name: ['John Deo'],
        profession: ['Software Engineer'],
        contact: this.formBuilder.array([
          this.formBuilder.group({ type: ['Phone'], value: ['050 000 0000'] }),
          this.formBuilder.group({ type: ['Email'], value: ['johne@deo.com'] }),
        ]),
        objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
          + ' Numquam, labore? Saepe, quis expedita consequatur eum accusamus, quidem non ex tempore '
          + 'cum a minus totam doloremque? Explicabo consectetur placeat illum! Natus!',
        sections: this.formBuilder.array([this.formBuilder.group({
          sectionTitle: 'Section Title',
          sectionHTML: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            + ' Numquam, labore? Saepe, quis expedita consequatur eum accusamus, quidem non ex tempore '
            + 'cum a minus totam doloremque? Explicabo consectetur placeat illum! Natus!',
          editor: new Editor()
        })]),
        skills: this.formBuilder.array([this.formBuilder.control('SKILL')])
      });
    }
    this.onFormDataChange.emit(this.form);

  }

  get contact() {
    return this.form.get('contact') as FormArray;
  }

  get skills() {
    return this.form.get('skills') as FormArray;
  }

  addContact() {
    this.contact.push(this.formBuilder.group({ type: 'Method:', value: 'lorem ipsum' }));
    this.saveFormToLocalStorage();
  }

  removeContact() {
    this.contact.removeAt(-1);
    this.saveFormToLocalStorage();
  }


  addSection() {
    this.sections.push(this.formBuilder.group({
      sectionTitle: 'Section Title', sectionHTML: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        + ' Numquam, labore? Saepe, quis expedita consequatur eum accusamus, quidem non ex tempore '
        + 'cum a minus totam doloremque? Explicabo consectetur placeat illum! Natus!', editor: new Editor()
    }))
  }

  removeSection() {
    this.sections.removeAt(-1);
    this.saveFormToLocalStorage();
  }

  get sections() {
    return this.form.get('sections') as FormArray;
  }

  addSkill() {
    this.skills.push(this.formBuilder.control('SKILL'));
    this.saveFormToLocalStorage();
  }

  removeSkill() {
    this.skills.removeAt(-1);
    this.saveFormToLocalStorage();
  }
  emitData() {
    this.onFormDataChange.emit(this.form);
    console.log(this.form);
    
    this.saveFormToLocalStorage();
  }

  saveFormToLocalStorage() {
    const formValue = this.form.getRawValue();
    const jsonString = JSON.stringify(formValue, (key, value) => {
      if (value instanceof Editor) {
        return undefined;
      }
      return value;
    }, 2);
    localStorage.setItem('form', jsonString);
  }

  parseFormFromLocalStorage(jsonString: string) {
    const jsonObject = JSON.parse(jsonString);
  
    this.form = this.formBuilder.group({
      name: [jsonObject.name || ''],
      profession: [jsonObject.profession || ''],
      contact: this.formBuilder.array(
        jsonObject.contact.map((contactItem: any) => 
          this.formBuilder.group({
            type: [contactItem.type || ''],
            value: [contactItem.value || '']
          })
        )
      ),
      objective: [jsonObject.objective || ''],
      sections: this.formBuilder.array(
        jsonObject.sections.map((sectionItem: any) =>
          this.formBuilder.group({
            sectionTitle: [sectionItem.sectionTitle || ''],
            sectionHTML: [sectionItem.sectionHTML || ''],
            editor: new Editor()
          })
        )
      ),
      skills: this.formBuilder.array(
        jsonObject.skills.map((skill: string) => 
          this.formBuilder.control(skill || '')
        )
      )
    });
  }
  
  
  
}
