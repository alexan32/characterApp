import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-roll-editor',
  templateUrl: './roll-editor.component.html',
  styleUrls: ['./roll-editor.component.css']
})
export class RollEditorComponent implements OnInit {

  mouseIndex = -1;
  editIndex = -1;

  keyUnderEdit: string = "";
  editKey: string = "";
  editValue: string = "";

  _rolls:any = {};
  keys: any[] = [];

  @Input() set characterRolls(rolls:any){
    this._rolls = rolls;
    console.log("character rolls: ", this._rolls);
    this.refreshKeys()
  };

  constructor() { }

  ngOnInit(): void {
  }

  refreshKeys(){
    this.keys = Object.keys(this._rolls);
    this.keys.sort((a,b)=>{
      if( a > b){
        return 1;
      }else if (a < b){
        return -1;
      }
      return 0;
    });
  }

  deleteRow(key){
    console.log("delete: ", key);
    delete this._rolls[key];
    this.refreshKeys();
  }

  editRow(key){
    console.log("edit: ", key);
    this.editKey = key;
    this.editValue = this._rolls[this.editKey];
  }

  saveRow(){
    delete this._rolls[this.keyUnderEdit];
    this._rolls[this.editKey] = this.editValue;
    this.refreshKeys();
  }

}
