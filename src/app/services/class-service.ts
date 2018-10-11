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
  currentSlot?: number;
}

export interface DragData {
  hasSource: boolean;
  groupId: number;
  positionId: number;
  what: SpotAssignment;
}


export class ClassService {

  static getAllSpecializations(): Array<Specialization> {
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
        'name': 'warrior',
        'specializations': [
          'core',
          'berserker',
          'spellbreaker'
        ]
      },
      {
        'name': 'ranger',
        'specializations': [
          'core',
          'druid',
          'soulbeast'
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
        'name': 'guardian',
        'specializations': [
          'core',
          'dragonhunter',
          'firebrand'
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
      },
      {
        'name': 'mesmer',
        'specializations': [
          'core',
          'chronomancer',
          'mirage'
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
}
