import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';



@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  character:Character = new Character();

  constructor() { 
    
  }

  ngOnInit(): void {
    console.log("Character: ", this.character);
  }

}
