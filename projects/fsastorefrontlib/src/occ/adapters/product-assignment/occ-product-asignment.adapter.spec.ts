import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OccFSProductAssignmentAdapter } from './occ-product-assignment.adapter';
import { OccConfig } from '@spartacus/core';
import { HttpClientModule } from '@angular/common/http';

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const payload = {
  userId: 'TestID',
  orgUnitId: 'AcmeCorp',
  pageSize: 5,
  currentPage: 1,
  sort: 'asc',
};

describe('OccFSProductAssignmentAdapter', () => {
  let productAssignmentAdapter: OccFSProductAssignmentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccFSProductAssignmentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    productAssignmentAdapter = TestBed.get(
      OccFSProductAssignmentAdapter as Type<OccFSProductAssignmentAdapter>
    );
    productAssignmentAdapter = TestBed.get(OccFSProductAssignmentAdapter);
  });
  describe('Load Product Assignments For Unit', () => {
    it('should load ', async(() => {
      productAssignmentAdapter
        .loadProductAssignmentsForUnit(
          payload.userId,
          payload.orgUnitId,
          payload.pageSize,
          payload.currentPage,
          payload.sort
        )
        .subscribe(res => {});
    }));
  });
  describe('Fails to Load Product Assignments For Unit', () => {
    it('should not load payload', async(() => {
      productAssignmentAdapter
        .loadProductAssignmentsForUnit(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
        .subscribe(res => {});
    }));
  });
});
