import { Component, OnInit } from '@angular/core';
import { WeeksDTO } from '../../../models/weeksDTO.model';
import { CurriculumSubtopic } from '../../../models/curriculumSubtopic.model';
/**
 * Authors: Daniel Robinson, Tyler Dresselhouse, Dylan Britton
 * Creates array of days in a week for curriculum view
 * 
 */

@Component({
  selector: 'app-curriculum-week',
  templateUrl: './curriculum-week.component.html',
  styleUrls: ['./curriculum-week.component.css']
})

export class CurriculumWeekComponent implements OnInit {

weekDTO: CurriculumSubtopic[] = [];
monday: CurriculumSubtopic[] = [];
tuesday: CurriculumSubtopic[] = [];
wednesday: CurriculumSubtopic[] = [];
thursday: CurriculumSubtopic[] = [];
friday: CurriculumSubtopic[] = [];

  constructor() { }

currentlyDragged;

  ngOnInit() {
 this.sortSubtopics();
  }
/**
 * 
 */
sortSubtopics() {
this.weekDTO.forEach(elem => {
switch (elem.curriculumSubtopicDay) {
  case 1:
    this.monday.push(elem);
    break;
  case 2:
    this.tuesday.push(elem);
    break;
  case 3:
    this.wednesday.push(elem);
    break;
  case 4:
    this.thursday.push(elem);
    break;
  case 5:
    this.friday.push(elem);
    break;
}
});
}

dropIt(event) {
event.target.append(this.currentlyDragged.target);
}

draggedFinder(currentlyDragged) {
this.currentlyDragged = currentlyDragged;
}
}
