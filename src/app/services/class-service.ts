
export interface Specialization {
  name: string;
  specializations: Array<string>;
}
export interface ReceivedItemEvent {
  source: number;
  position: number;
}
export interface SpotAssignment {
  specialization: Specialization;
  index: number;
}

export interface DragData {
  hasSource: boolean;
  groupId: number;
  positionId: number;
  what: SpotAssignment;
}


export class ClassService {
  static getAllSpecializations(): Array<Specialization> {
    return this.getHeavySpecializations().concat(this.getMediumSpecialization(), this.getLightSpecializations());
  }
  static getHeavySpecializations(): Array<Specialization> {
    return [
      {
        'name': 'warrior',
        'specializations': [
          'core',
          'berserker',
          'spellbreaker'
        ]
      },
      {
        'name': 'guardian',
        'specializations': [
          'core',
          'dragonhunter',
          'firebrand'
        ]
      },
      {
        'name': 'revenant',
        'specializations': [
          'core',
          'herald',
          'renegade'
        ]
      }

    ];
  }
  static getMediumSpecialization(): Array<Specialization> {
    return [
      {
        'name': 'ranger',
        'specializations': [
          'core',
          'druid',
          'soulbeast'
        ]
      },
      {
        'name': 'thief',
        'specializations': [
          'core',
          'daredevil',
          'deadeye'
        ]
      },
      {
        'name': 'engineer',
        'specializations': [
          'core',
          'scrapper',
          'holosmith'
        ]
      }
    ];
  }
  static getLightSpecializations(): Array<Specialization> {
    return [
      {
        'name': 'elementalist',
        'specializations': [
          'core',
          'tempest',
          'weaver'
        ]
      },
      {
        'name': 'necromancer',
        'specializations': [
          'core',
          'reaper',
          'scourge'
        ]
      },
      {
        'name': 'mesmer',
        'specializations': [
          'core',
          'chronomancer',
          'mirage'
        ]
      }
    ];
  }
}
