import {Component, OnInit} from '@angular/core';
import {ClassService, SpotAssignment} from './services/class-service';

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.css']
           })
export class AppComponent implements OnInit {
  group: Array<Array<SpotAssignment>>;
  currentLink = '';
  nameEncoder = {
    'warrior': 0,
    'guardian': 1,
    'revenant': 2,
    'ranger': 3,
    'thief': 4,
    'engineer': 5,
    'elementalist': 6,
    'necromancer': 7,
    'mesmer': 8
  };

  ngOnInit() {
    const href = window.location.search.substring(1);
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

    if (href) {
      this.readLink(href);
    }
  }

  private b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                                                function toSolidBytes(match, p1) {
                                                  return String.fromCharCode(Number('0x' + p1));
                                                }));
  }

  private b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  generateLink() {
    // location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    const link = [];
    this.group.forEach((value, index) => {
      link.push(this.serializeGroup(value));
    });
    this.currentLink = this.baseLink() + this.b64EncodeUnicode(JSON.stringify(link));
  }

  readLink(gibberish: string) {
    try {
      const allSpecs = ClassService.getAllSpecializations();
      const text = this.b64DecodeUnicode(gibberish);
      const serialized: Array<string> = JSON.parse(text);
      serialized.forEach((value, index) => {
        if (value !== 'x') {
          let slot = 0;
          for (let i = 0; i < value.length; i++) {
            if ( value.charAt(i) !== '-' ) {
              const specId = value.charAt(i);
              const specIndex = +value.charAt(i + 1);
              this.group[index][slot] = {
                specialization: allSpecs[specId],
                index: specIndex
              };
              i++;
            }
            slot++;
          }
        }
      });
    } catch (ignored) {
    }
  }

  serializeGroup(value: Array<SpotAssignment>) {
    let out = '';
    let empty = true;
    value.forEach((spot) => {
      if (spot == null) {
        out += '-';
      } else {
        out += this.nameEncoder[spot.specialization.name] + '' + spot.index;
        empty = false;
      }
    });
    if ( empty ) {
      return 'x';
    }
    return out;
  }

  private baseLink() {
    return window.location.protocol + '//' + window.location.hostname + (location.port ? ':' + location.port : '') + '/editor?';
  }
}
