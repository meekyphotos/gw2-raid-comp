import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DragData, ReceivedItemEvent, SpotAssignment, SquadMember} from '../services/class-service';

@Component({
             selector: 'app-group',
             templateUrl: './group.component.html',
             styleUrls: ['./group.component.css']
           })
export class GroupComponent implements OnInit {
  @Input() title: string;
  @Input() groupId: number;
  @Input() party: Array<SquadMember>;
  @Output() receivedItem: EventEmitter<ReceivedItemEvent> = new EventEmitter<ReceivedItemEvent>();
  @Output() updated: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  static isGuardian(value) {
    return value.specialization.name === 'guardian';
  }

  static isElementalist(value: SquadMember) {
    return value.specialization === 'ELEMENTALIST' || value.specialization === 'TEMPEST' ||  value.specialization === 'WEAVER' ;
  }

  static isFirebrand(value: SquadMember) {
    return value.specialization === 'FIREBRAND';
  }

  static isTempest(value: SquadMember) {
    return value.specialization === 'TEMPEST';
  }

  static isScrapper(value: SquadMember) {
    return value.specialization === 'SCRAPPER';
  }

  static isChronomancer(value: SquadMember) {
    return value.specialization === 'CHRONOMANCER';
  }

  static isHerald(value: SquadMember) {
    return value.specialization === 'HERALD';
  }

  static isDaredevil(value: SquadMember) {
    return value.specialization === 'DAREDEVIL';
  }

  static isNecromancer(value: SquadMember) {
    return value.specialization === 'SCOURGE' || value.specialization === 'REAPER' || value.specialization === 'NECROMANCER' ;
  }

  testConditions(callbackfn: (value: SquadMember, index: number, array: SquadMember[]) => boolean): boolean {
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
    this.updated.emit(true);
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
