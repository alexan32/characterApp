import { Component, Inject, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-character-rolls',
  templateUrl: './character-rolls.component.html',
  styleUrls: ['./character-rolls.component.css']
})
export class CharacterRollsComponent implements OnInit {

  @Input() set character(character:Character){
    if(character){
      this._character = character;
      this.customRolls = this._character.customRolls;
      this.keys = Object.keys(this.customRolls);
    }
  }

  _character: Character = null;
  customRolls = {};
  keys: any[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(key): void {
    const dialogRef = this.dialog.open(CharacterRollsDialog, {
      data: {
        key: key,
        character: this._character
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);
    });
  }

}

@Component({
  selector: "character-rolls-dialog",
  templateUrl: "./dialog.html",
  styleUrls: ['./dialog.css']
})
export class CharacterRollsDialog{

  character: Character;
  customRolls: any = {};
  copy: any = {};
  keys: any[] = [];
  key: string = "";

  tempKey: string = "";
  tempFunc: string = "";

  constructor(public dialogRef: MatDialogRef<CharacterRollsDialog>, @Inject(MAT_DIALOG_DATA) public data:any){
    console.log("dialog data: ", data);
    this.key = data.key;
    this.character = data.character;

    this.customRolls = this.character.customRolls;
    this.copy = JSON.parse(JSON.stringify(this.customRolls));
    this.keys = Object.keys(this.customRolls);

    this.tempKey = this.key;
    this.tempFunc = this.copy[this.key];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateKey(event:any){
    this.copy[event] = this.tempFunc;
    delete this.copy[this.key];
  }

  updateFunc(event:any){
    delete this.copy[this.key]
    this.copy[this.tempKey] = event
  }

}
