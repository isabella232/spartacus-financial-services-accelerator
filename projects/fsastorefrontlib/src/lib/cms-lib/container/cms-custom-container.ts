import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CmsComponent, CMSCustomCMSComponentsContainer } from '../../occ-models';

@Component({
  selector: 'fsa-cms-custom-container',
  templateUrl: './cms-custom-container.html'
})
export class CmsCustomContainerComponent {

  routeParamId = 'formCode';
  pageContext: PageContext;

  components$: Observable<CmsComponent[]>;

  constructor(
    protected componentData: CmsComponentData<CMSCustomCMSComponentsContainer>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
  ) {
    activatedRoute.params.subscribe(params => {
      this.pageContext = new PageContext(params[this.routeParamId], PageType.CATEGORY_PAGE);
    });
  }

  ngOnInit() {
    this.componentData.data$.subscribe(data => {
      this.components$ = this.cmsComponentConnector.getList(data.simpleCMSComponents.split(' '), this.pageContext);
    });
  }

}
