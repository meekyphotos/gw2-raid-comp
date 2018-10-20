
export interface SquadMember {
  memberId: number;
  name: string;
  specialization: string;
}
export interface SquadCompPage {
  squadMembers: Array<SquadMember>;
}

export interface Specialization {
  name: string;
  specializations: Array<string>;
}
export interface ReceivedItemEvent {
  source: number;
  position: number;
}
export interface SpotAssignment {
  specialization: SquadMember;
  index: number;
}

export interface DragData {
  hasSource: boolean;
  groupId: number;
  positionId: number;
  what: SquadMember;
}

export interface SerializedComp {
  code: string;
}

export interface PartyMember {
  partyId: number;
  memberId: number;
  specialization: string;
}

export interface SquadComp {
  parties: Array<PartyMember>;
}
