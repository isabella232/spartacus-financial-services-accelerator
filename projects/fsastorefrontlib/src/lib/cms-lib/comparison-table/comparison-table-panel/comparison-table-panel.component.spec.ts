import { Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsComponent } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '@spartacus/storefront';
import { ComparisonPanelCMSComponent } from 'fsastorefrontlib/lib/occ-models';
import { ComparisonTablePanelComponent } from './comparison-table-panel.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { OccBillingTimeService } from './../../../occ/billing-time/billing-time.service';

@Component({
  // tslint:disable
  selector: 'fsa-comparison-table-panel-item',
  template: '',
})
export class MockComparisonTablePanelItem {
  @Input() productCode: string;
  @Input() billingTimes: any;
}

class MockOccBillingTimeService {}

describe('ComparisonTablePanelComponent', () => {
  let comparisonTablePanel: ComparisonTablePanelComponent;
  let fixture: ComponentFixture<ComparisonTablePanelComponent>;

  const componentData: ComparisonPanelCMSComponent = {
    uid: 'TestComparisonTablePanelComponent',
    typeCode: 'ComparisonPanelCMSComponent',
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'testComponent',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbTooltipModule],
      declarations: [
        ComparisonTablePanelComponent,
        MockComparisonTablePanelItem,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: OccBillingTimeService,
          useValue: MockOccBillingTimeService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTablePanelComponent);
    comparisonTablePanel = fixture.componentInstance;
  });

  it('should create comparison panel component', () => {
    expect(comparisonTablePanel).toBeTruthy();
  });
});
