import {Component, Input, OnInit} from '@angular/core';
import {Specialization, SpotAssignment, SquadMember} from '../services/class-service';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnInit {
  name: string;
  image: string;
  specialization: string;
  core: string;

  @Input()
  src: SquadMember;

  constructor() { }

  private static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  private static getCoreClassFromSpecialization(specialization: string) {
    switch (specialization) {
      case 'THIEF':
        return 'thief';
      case 'DAREDEVIL':
        return 'thief';
      case 'DEADEYE':
        return 'thief';
      case 'ELEMENTALIST':
        return 'elementalist';
      case 'TEMPEST':
        return 'elementalist';
      case 'WEAVER':
        return 'elementalist';
      case 'GUARDIAN':
        return 'guardian';
      case 'DRAGONHUNTER':
        return 'guardian';
      case 'FIREBRAND':
        return 'guardian';
      case 'REVENANT':
        return 'revenant';
      case 'HERALD':
        return 'revenant';
      case 'RENEGADE':
        return 'revenant';
      case 'NECROMANCER':
        return 'necromancer';
      case 'REAPER':
        return 'necromancer';
      case 'SCOURGE':
        return 'necromancer';
      case 'WARRIOR':
        return 'warrior';
      case 'BERSERKER':
        return 'warrior';
      case 'SPELLBREAKER':
        return 'warrior';
      case 'ENGINEER':
        return 'engineer';
      case 'SCRAPPER':
        return 'engineer';
      case 'HOLOSMITH':
        return 'engineer';
      case 'RANGER':
        return 'rangers';
      case 'DRUID':
        return 'rangers';
      case 'SOULBEAST':
        return 'rangers';
      case 'MESMER':
        return 'mesmer';
      case 'CHRONOMANCER':
        return 'mesmer';
      case 'MIRAGE':
        return 'mesmer';
    }
    return '';
  }

  ngOnInit() {
    this.specialization = this.src.specialization.toLowerCase();
    this.name = this.src.name;
    this.image = '/assets/img/' + this.src.specialization.toLowerCase() + '.png';
    this.core = SpotComponent.getCoreClassFromSpecialization(this.src.specialization);
  }

}
