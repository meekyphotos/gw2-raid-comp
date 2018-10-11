import { Injectable } from '@angular/core';
import {SpotAssignment} from './services/class-service';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }

  serializeDrag(spot: SpotAssignment) {
    return JSON.stringify(spot);
  }

  deserializeDrag(data: string): SpotAssignment {
    return JSON.parse(data);
  }


}
