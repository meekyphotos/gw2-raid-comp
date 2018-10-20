import {Component, OnInit, ViewChild} from '@angular/core';
import {SerializedComp, SquadComp, SquadMember} from './services/class-service';
import {ClassPanelComponent} from './class-panel/class-panel.component';
import {HttpClient} from '@angular/common/http';

function assignToFirstNonEmptySpot(groupElement: Array<SquadMember>, squadMember: SquadMember) {
  groupElement[groupElement.findIndex(value => value == null)] = squadMember;
}

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.css']
           })
export class AppComponent implements OnInit {
  group: Array<Array<SquadMember>>;
  currentLink = '';
  mode = false;
  @ViewChild('classPanel') classPanel: ClassPanelComponent;
  constructor(private http: HttpClient) {

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
    this.group[8] = [null, null, null, null, null];
    this.group[9] = [null, null, null, null, null];
  }


  generateLink() {
    this.http
        .post<SerializedComp>('/api/serialize', {members: this.group})
        .subscribe(it => {
          // location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
          this.currentLink = this.baseLink() + it.code;
        });
  }

  readLink(gibberish: string) {
    this.http.post<SquadComp>('/api/deserialize', {code: gibberish})
        .subscribe(result => {
          const usedSpecializations = [];
          result.parties.forEach(it => {
            const squadMember = this.classPanel.getSquadMemberById(it.memberId, it.specialization);
            assignToFirstNonEmptySpot(this.group[it.partyId], squadMember);
            usedSpecializations.push(squadMember);
          });
          this.classPanel.updateList(usedSpecializations);
        });
  }

  private baseLink() {
    return window.location.protocol + '//' + window.location.hostname + (location.port ? ':' + location.port : '') + '/editor?';
  }

  notifyClassPanel($event: Array<SquadMember>) {
    this.classPanel.updateList($event);
  }

  onClassPanelReady() {
    const href = window.location.search.substring(1);
    if (href) {
      this.readLink(href);
    }

  }

  switchMode() {
    // reset currently assigned stuff.
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
    this.classPanel.reloadList(this.mode);
    this.mode = !this.mode;
  }
}
