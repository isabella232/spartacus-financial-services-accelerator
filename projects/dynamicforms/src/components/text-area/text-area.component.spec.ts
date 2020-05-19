import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { TextAreaComponent } from './text-area.component';
import { of } from 'rxjs';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

class MockOccValueListService {}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockField: FieldConfig = {
  fieldType: 'textarea',
  name: 'testTextArea',
  label: {
    en: 'What time did it happen?',
  },
};

const mockFormGroup = new FormGroup({
  testTextArea: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccValueListService, useClass: MockOccValueListService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check components type', () => {
    expect(component.config).toBe(mockField);
    expect(component.config.fieldType).toEqual('textarea');
  });

  it('should render textarea component', () => {
    const TextAreaComponent = el.query(By.css('textarea')).nativeElement;
    expect(TextAreaComponent).toBeTruthy();
  });
});
