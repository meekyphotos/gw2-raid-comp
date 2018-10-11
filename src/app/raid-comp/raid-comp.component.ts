import {Component, Input, OnInit} from '@angular/core';
import {ClassService, DragData, ReceivedItemEvent, Specialization, SpotAssignment} from '../services/class-service';

function assign(specs: Array<Specialization>, classId: number, specId: number): SpotAssignment {
  return {
    'specialization': specs[classId],
    'index': specId
  };
}

@Component({
             selector: 'app-raid-comp',
             templateUrl: './raid-comp.component.html',
             styleUrls: ['./raid-comp.component.css']
           })
export class RaidCompComponent implements OnInit {
  @Input() group: Array<Array<SpotAssignment>>;

  constructor() {
  }

  ngOnInit() {
  }

  handleReceived(evt: ReceivedItemEvent) {
    this.group[evt.source][evt.position] = null;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const spotAssignment: DragData = JSON.parse(data);
    if (spotAssignment.hasSource) {
      this.group[spotAssignment.groupId][spotAssignment.positionId] = null;
    }
  }




}
