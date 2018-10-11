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
  @Output() receivedItem: EventEmitter<ReceivedItemEvent> = new EventEmitter<ReceivedItemEvent>();

  static isGuardian(value) {
    return value.specialization.name === 'guardian';
  }

  static isElementalist(value) {
    return value.specialization.name === 'elementalist';
  }

  static isFirebrand(value) {
    return value.specialization.name === 'guardian' && value.index === 2;
  }

  static isTempest(value) {
    return value.specialization.name === 'elementalist' && value.index === 1;
  }

  static isScrapper(value) {
    return value.specialization.name === 'engineer' && value.index === 1;
  }

  static isChronomancer(value) {
    return value.specialization.name === 'mesmer' && value.index === 1;
  }

  static isHerald(value) {
    return value.specialization.name === 'revenant' && value.index === 1;
  }

  static isDaredevil(value) {
    return value.specialization.name === 'thief' && value.index === 1;
  }

  static isNecromancer(value) {
    return value.specialization.name === 'necromancer';
  }

  testConditions(callbackfn: (value: SpotAssignment, index: number, array: SpotAssignment[]) => boolean): boolean {
    return this.party.filter((value, index, array) => value != null && callbackfn(value, index, array)).length > 0;
  }

  aegis() {
    return this.testConditions(value => GroupComponent.isFirebrand(value));
  }

  alacrity() {
    return this.testConditions(value => GroupComponent.isChronomancer(value));
  }

  fury() {
    return this.testConditions(value =>
                                 GroupComponent.isHerald(value) ||
                                 GroupComponent.isDaredevil(value));
  }

  might() {
    return this.testConditions(value =>
                                 GroupComponent.isGuardian(value) ||
                                 GroupComponent.isHerald(value));
  }

  protection() {
    return this.testConditions(value =>
                                 GroupComponent.isFirebrand(value));
  }

  quickness() {
    return this.testConditions(value =>
                                 GroupComponent.isFirebrand(value));
  }

  regeneration() {
    return this.testConditions(value =>
                                 GroupComponent.isGuardian(value) ||
                                 GroupComponent.isTempest(value) ||
                                 GroupComponent.isScrapper(value) ||
                                 GroupComponent.isChronomancer(value) ||
                                 GroupComponent.isNecromancer(value));
  }

  resistance() {
    return this.testConditions(value =>
                                 GroupComponent.isFirebrand(value));
  }

  retaliation() {
    return this.testConditions(value =>
                                 GroupComponent.isFirebrand(value));
  }

  stability() {
    return this.testConditions(value =>
                                 GroupComponent.isGuardian(value) ||
                                 GroupComponent.isHerald(value) ||
                                 GroupComponent.isScrapper(value) ||
                                 GroupComponent.isChronomancer(value));
  }

  swiftness() {
    return this.testConditions(value =>
                                 GroupComponent.isDaredevil(value) ||
                                 GroupComponent.isGuardian(value) ||
                                 GroupComponent.isElementalist(value));
  }

  vigor() {
    return this.testConditions(value => GroupComponent.isDaredevil(value));
  }

  ngOnInit() {

  }

  countParty() {
    let count = 0;
    for (const partyElement of this.party) {
      if (partyElement != null) {
        count++;
      }
    }
    return count;
  }

  isFull() {
    for (const partyElement of this.party) {
      if (partyElement == null) {
        return false;
      }
    }
    return true;
  }

  drop(slotIndex, ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const spotAssignment: DragData = JSON.parse(data);
    this.party[slotIndex] = spotAssignment.what;
    if (spotAssignment.hasSource) {
      if (spotAssignment.groupId === this.groupId) {
        if (spotAssignment.positionId !== slotIndex) {
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
