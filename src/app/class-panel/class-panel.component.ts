import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DragData, SquadCompPage, SquadMember} from '../services/class-service';
import {HttpClient} from '@angular/common/http';

@Component({
             selector: 'app-class-panel',
             templateUrl: './class-panel.component.html',
             styleUrls: ['./class-panel.component.css']
           })
export class ClassPanelComponent implements OnInit {
  members: Array<Array<SquadMember>>;
  visibleMembers: Array<Array<SquadMember>>;
  @Output() ready: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {
  }
  private handleMembers = it => {
    this.members = [];
    this.visibleMembers = [];
    const temp = {};
    it.squadMembers.forEach(val => {
      if (temp[val.memberId]) {
        temp[val.memberId].push(val);
      } else {
        temp[val.memberId] = [val];
      }
    });
    Object.keys(temp).forEach(memberId => {
      this.members.push(temp[memberId]);
      this.visibleMembers.push(temp[memberId]);
    });
    this.ready.emit(true);
  };

  ngOnInit() {
    this.members = [];
    this.http.get<SquadCompPage>('/api/attendance').subscribe(this.handleMembers);
  }

  drag(spec: SquadMember, index: number, ev) {
    const dragData: DragData = {
      hasSource: false,
      groupId: undefined,
      positionId: undefined,
      what: spec
    };
    ev.dataTransfer.setData('text', JSON.stringify(dragData));
  }

  updateList(usedMembers: Array<SquadMember>) {
    const memberAssigned = usedMembers.map(it => it.memberId);
    this.visibleMembers = this.members.filter(it => memberAssigned.indexOf(it[0].memberId) < 0);
  }

  getSquadMemberById(memberId: number, specialization: string): SquadMember {
    return this.members
        .map(it => it.filter(member => member.memberId === memberId && member.specialization === specialization))
        .filter(arr => arr.length !== 0)[0][0];
  }

  reloadList(mode: boolean) {
    this.members = [];
    if ( mode ) {
      this.http.get<SquadCompPage>('/api/attendance').subscribe(this.handleMembers);
    } else {
      this.http.get<SquadCompPage>('/api/template').subscribe(this.handleMembers);
    }
  }
}
