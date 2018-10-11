import {Component, Input, OnInit} from '@angular/core';
import {Specialization, SpotAssignment} from '../services/class-service';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnInit {
  name: string;
  image: string;
  specialization: string;

  @Input()
  src: SpotAssignment;

  constructor() { }

  private static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit() {
    this.specialization = this.src.specialization.name;
    if ( this.src.index === 0 ) {
      this.name = SpotComponent.capitalizeFirstLetter(this.src.specialization.name);
      this.image = '/assets/img/' + this.src.specialization.name + '.png';
    } else {
      this.name = SpotComponent.capitalizeFirstLetter(this.src.specialization.specializations[this.src.index]);
      this.image = '/assets/img/' + this.src.specialization.specializations[this.src.index] + '.png';
    }

  }

}
