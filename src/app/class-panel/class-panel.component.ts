import {Component, OnInit} from '@angular/core';
import {ClassService, DragData, Specialization} from '../services/class-service';

@Component({
             selector: 'app-class-panel',
             templateUrl: './class-panel.component.html',
             styleUrls: ['./class-panel.component.css']
           })
export class ClassPanelComponent implements OnInit {
  availableSpecializations: Array<Specialization>;

  constructor() {
  }

  ngOnInit() {
    this.availableSpecializations = ClassService.getAllSpecializations();
  }

  drag(spec: Specialization, index: number, ev) {
    const dragData: DragData = {
      hasSource: false,
      groupId: undefined,
      positionId: undefined,
      what: {
        specialization: spec,
        index: index
      }
    };
    ev.dataTransfer.setData('text', JSON.stringify(dragData));
  }
}
