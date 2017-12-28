import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Trainee } from '../../entities/Trainee';
import { Batch } from '../../entities/Batch';

/**
 * Service that handles report granularity. Trainee and current batch
 * data is stored in their respective behavior subjects and read by
 * observables. New trainees and batches can be pushed to these subjects
 * through use of exposed functions.
 *
 * @author Micah West
 */
@Injectable()
export class GranularityService {

  /* Subjects & Paired Observables */
  private currentBatch = new BehaviorSubject<Batch>(null);
  private currentTrainee = new BehaviorSubject<Trainee>(null);

  public currentBatch$ = this.currentBatch.asObservable();
  public currentTrainee$ = this.currentTrainee.asObservable();

  constructor() { }

  /*
  =================================
            PUSH METHODS
  =================================
  */

  /**
   * Pushes the specified trainee to the currentTrainee subject.
   * @param trainee - Trainee to push to the subject.
   */
  pushTrainee(trainee: Trainee) {
    this.currentTrainee.next(trainee);
  }

  /**
   * Pushes the specified batch to the currentBatch subject.
   * @param batch - Batch to push to the subject.
   */
  pushBatch(batch: Batch) {
    this.currentBatch.next(batch);
  }
}
