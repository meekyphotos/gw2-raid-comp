import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DragData, ReceivedItemEvent, SquadMember} from '../services/class-service';

@Component({
             selector: 'app-raid-comp',
             templateUrl: './raid-comp.component.html',
             styleUrls: ['./raid-comp.component.css']
           })
export class RaidCompComponent {
  @Input() group: Array<Array<SquadMember>>;
  @Output() changesToSquad: EventEmitter<Array<SquadMember>> = new EventEmitter<Array<SquadMember>>();

  private static getUsedMembers(group: Array<Array<SquadMember>>) {
    const out = [];
    group.forEach(value => {
      out.push(...value.filter(it => it != null));
    });
    return out;
  }

  constructor() {
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
      this.changesToSquad.emit(RaidCompComponent.getUsedMembers(this.group));
    }
  }

  emitUpdates() {
    this.changesToSquad.emit(RaidCompComponent.getUsedMembers(this.group));
  }
}
