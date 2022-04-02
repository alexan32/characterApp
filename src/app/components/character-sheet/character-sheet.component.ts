import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';



@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  @Input() character:Character;

  constructor() { 
    
  }

  ngOnInit(): void {
    console.log("Character: ", this.character);
  }

}
