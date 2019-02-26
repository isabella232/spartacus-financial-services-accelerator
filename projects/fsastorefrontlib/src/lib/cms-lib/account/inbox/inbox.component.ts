import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CmsComponentMapping, CmsService, StandardCmsComponentConfig } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { InboxService } from '../../../my-account/assets/services/inbox.service';
import * as fromStore from '../../../my-account/assets/store';
import { CmsInboxComponent, CmsInboxTabComponent } from './../../../occ-models/cms-component.models';

export interface Mapping extends StandardCmsComponentConfig {
  CMSInboxTabComponent?: CmsComponentMapping;
}

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService,
    protected store: Store<fromStore.UserState>
  ) {}

  component$: Observable<CmsInboxComponent>;
  messages$;

  ngOnInit() {
    this.component$ = this.componentData.data$;
  }

  splitArray(arrayToSplit: string): string[] {
    return arrayToSplit.split(' ');
  }

  loadTab(tabId): Observable<CmsInboxTabComponent> {
    return this.cmsService.getComponentData(tabId);
  }

  loadGroup(group: string) {
    this.inboxService.loadMessagesByMessageGroup(group);
    this.messages$ = this.store.pipe(select(fromStore.getMessages));
  }
}
