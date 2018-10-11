import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DragData, ReceivedItemEvent, SpotAssignment} from '../services/class-service';

@Component({
             selector: 'app-group',
             templateUrl: './group.component.html',
             styleUrls: ['./group.component.css']
           })
export class GroupComponent implements OnInit {
  @Input() title: string;
  @Input() groupId: number;
  @Input() party: Array<SpotAssignment>;
  @Output() receivedItem: EventEmitter<ReceivedItemEvent>;

  constructor() {
    this.receivedItem = new EventEmitter();
  }

  ngOnInit() {


  }

  drop(slotIndex, ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const spotAssignment: DragData = JSON.parse(data);
    this.party[slotIndex] = spotAssignment.what;
    if ( spotAssignment.hasSource ) {
      if ( spotAssignment.groupId === this.groupId ) { // no need to scream
        if ( spotAssignment.positionId !== slotIndex ) {
          this.party[spotAssignment.positionId] = null;
        }
      } else {
        this.receivedItem.emit({
          source: spotAssignment.groupId,
          position: spotAssignment.positionId
        });
      }
    }
  }

  drag(slotIndex, ev) {
    if (this.party[slotIndex]) {
      const dragData: DragData = {
        hasSource: true,
        groupId: this.groupId,
        positionId: slotIndex,
        what: this.party[slotIndex]
      };
      ev.dataTransfer.setData('text', JSON.stringify(dragData));
    } else {
      ev.preventDefault();
    }

  }

  allowDrop(ev) {
    ev.preventDefault();
  }
}
