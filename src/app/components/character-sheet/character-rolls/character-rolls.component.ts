import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-character-rolls',
  templateUrl: './character-rolls.component.html',
  styleUrls: ['./character-rolls.component.css']
})
export class CharacterRollsComponent implements OnInit {

  @Input() character: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
