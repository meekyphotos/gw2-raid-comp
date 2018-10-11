import {Component, OnInit} from '@angular/core';
import {ClassService, DragData, Specialization} from '../services/class-service';

@Component({
             selector: 'app-class-panel',
             templateUrl: './class-panel.component.html',
             styleUrls: ['./class-panel.component.css']
           })
export class ClassPanelComponent implements OnInit {
  lightSpecializations: Array<Specialization>;
  mediumSpecializations: Array<Specialization>;
  heavySpecializations: Array<Specialization>;

  constructor() {
  }

  ngOnInit() {
    this.lightSpecializations = ClassService.getLightSpecializations();
    this.mediumSpecializations = ClassService.getMediumSpecialization();
    this.heavySpecializations = ClassService.getHeavySpecializations();
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
