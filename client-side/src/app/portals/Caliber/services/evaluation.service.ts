import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CacheData } from '../../../entities/CacheData.entity';
import { HttpClient } from '@angular/common/http';
import { PanelReview } from '../../Caliber/entities/PanelReview';
import { urls } from './urls';



/**
 * Service handles API calls and tracks fetched data for caching.
 * Fetched data is exposed by observables which get data from private
 * BehaviorSubjects.
 *
 * @author Christopher Youngblood
 */
@Injectable()
export class EvaluationService {

  /* Subjects & Paired Observables */

  private allQCTraineeNotes = new BehaviorSubject<CacheData>(null);
  public allQCTraineeNotes$ = this.allQCTraineeNotes.asObservable();

  private allQCBatchNotes = new BehaviorSubject<CacheData>(null);
  public allQCBatchNotes$ = this.allQCBatchNotes.asObservable();

  constructor(private httpClient: HttpClient) { }

  private needsRefresh(sub: BehaviorSubject<CacheData>, params: any): boolean {
    return !sub.getValue() || sub.getValue().params !== params;
  }

  /*
  =================================
          API CALLS
  =================================
  */

  /**
   *
   * @param batchId batchId filter value
   * @param weekId weekId filter value
   */
  FetchAllQCTraineeNotes(batchId: Number, weekId: Number) {
    const endpoint = urls.apiFetchAllQCTraineeNotes(batchId, weekId);
    const params = {
      batchId: batchId,
      weekId: weekId
    };

    if (this.needsRefresh(this.allQCTraineeNotes, params)) {
      this.httpClient.get(endpoint).subscribe(
        success => {
          this.allQCTraineeNotes.next({params: params, data: success});
        });
    }
  }

  FetchAllQCBatchNotes(batchId: Number, weekId: Number) {
    const endpoint = urls.apiFetchAllQCBatchNotes(batchId, weekId);
    const params = {
      batchId: batchId,
      weekId: weekId
    };

    if (this.needsRefresh(this.allQCBatchNotes, params)) {
      this.httpClient.get(endpoint).subscribe(
        success => {
          this.allQCBatchNotes.next({params: params, data: success});
        });
    }
  }
}
