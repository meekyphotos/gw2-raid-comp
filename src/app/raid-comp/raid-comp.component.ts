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
    const href = window.location.search.substring(1);
    if (href) {
      // decode build
      // [[[0,1], [0,1], [0,1], [], [0,1]], [[0,1], [0,1], [0,1], [0,1], [0,1]], [[0,1], [0,1], [0,1], [0,1], [0,1]], [[0,1], [0,1], [0,1], [0,1], [0,1]]]
    } else {
      this.group = [];
      this.group[0] = [null, null, null, null, null];
      this.group[1] = [null, null, null, null, null];
      this.group[2] = [null, null, null, null, null];
      this.group[3] = [null, null, null, null, null];
      this.group[4] = [null, null, null, null, null];
      this.group[5] = [null, null, null, null, null];
      this.group[6] = [null, null, null, null, null];
      this.group[7] = [null, null, null, null, null];
      this.group[8] = [null, null, null, null, null];
      this.group[9] = [null, null, null, null, null];
    }
    console.log(href);


  }

  handleReceived(evt: ReceivedItemEvent) {
    console.log('received stuff: ' + evt);
    this.group[evt.source][evt.position] = null;
  }
}
