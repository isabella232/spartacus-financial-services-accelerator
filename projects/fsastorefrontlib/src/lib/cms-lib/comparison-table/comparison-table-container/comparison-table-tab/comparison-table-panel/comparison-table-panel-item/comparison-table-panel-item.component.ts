import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ComparisonTableService } from '../../../../comparison-table.service';
import { FSCartService } from 'projects/fsastorefrontlib/src/lib/checkout/assets/services';

@Component({
    selector: 'fsa-comparison-table-panel-item',
    templateUrl: './comparison-table-panel-item.component.html',
    styleUrls: ['./comparison-table-panel-item.component.scss'],
    providers: [ComparisonTableService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTablePanelItemComponent implements OnInit {

    @Input()
    productCode: string;
    @Input()
    billingTimes: any;

    constructor(
        protected comparisonTableService: ComparisonTableService,
        protected cartService: FSCartService
    ) {
    }

    product$;
    panelItemEntries = this.comparisonTableService.getPanelItemEntries();

    ngOnInit() {
        this.product$ = this.comparisonTableService.getProductData(this.productCode);
        this.product$.subscribe(data => {
            if (data) {
                this.panelItemEntries = this.billingTimes.map(billingTime => {
                    return data.price.oneTimeChargeEntries.find(entry => entry.billingTime.code === billingTime.code);
                });
            }
        });
    }

    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
    }
}
