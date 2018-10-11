import {Component, OnInit} from '@angular/core';
import {ClassService, ReceivedItemEvent, Specialization, SpotAssignment} from '../services/class-service';

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
  group: Array<Array<SpotAssignment>>;

  constructor() {
  }

  ngOnInit() {
    this.group = [];
    this.group[0] = [null, null, null, null, null];
    this.group[1] = [null, null, null, null, null];
    this.group[2] = [null, null, null, null, null];
    this.group[3] = [null, null, null, null, null];
    this.group[4] = [null, null, null, null, null];
    this.group[5] = [null, null, null, null, null];
    this.group[6] = [null, null, null, null, null];
    this.group[7] = [null, null, null, null, null];
  }

  handleReceived(evt: ReceivedItemEvent) {
    this.group[evt.source][evt.position] = null;
  }
}
