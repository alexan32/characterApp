import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-roll-editor',
  templateUrl: './roll-editor.component.html',
  styleUrls: ['./roll-editor.component.css']
})
export class RollEditorComponent implements OnInit {

  mouseIndex = -1;
  editIndex = -1;

  isNew: boolean = false;
  keyValid: boolean = true;

  keyUnderEdit: string = "";
  editKey: string = "";
  editValue: string = "";

  masterCopy:any = {};
  _rolls:any = {};
  keys: any[] = [];

  search: string = "";
  validationMessage = "";

  @Input() set characterRolls(rolls:any){
    this.masterCopy = rolls;
    this._rolls = JSON.parse(JSON.stringify(this.masterCopy));
    console.log("character rolls: ", this._rolls);
    this.refreshKeys()
  };

  @Output() characterRollsChange = new EventEmitter<any>();

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

  confirmDelete(key){
    if(confirm(`Are you sure that you want to delete "${key}"?`)){
      this.deleteRow(key);
    }
  }

  editRow(key){
    console.log("edit: ", key);
    this.keyUnderEdit = key;
    this.editKey = key;
    this.editValue = this._rolls[this.editKey];
  }

  cleanKey(){
    this.editKey = this.editKey.split(" ").join("");
    return this.editKey;
  }

  saveRow(){
    delete this._rolls[this.keyUnderEdit];
    this._rolls[this.editKey] = this.editValue;
    this.refreshKeys();
  }

  createNew(){
    this._rolls["*TEMP*"] = ""
    this.keys.push("*TEMP*");
    this.editIndex = this.keys.length - 1;
    this.editRow("*TEMP*");
    this.editKey = "";
    setTimeout(()=>{
      var objDiv = document.getElementById("scroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 50);
  }

  keyIsInvalid(){
    this.keyValid = true;
    this.validationMessage = "";
    this.cleanKey();
    if(this.editKey == ""){
      this.keyValid = false;
      this.validationMessage = "Roll name cannot be blank."
      console.warn(this.validationMessage);
      return;
    }
    if(this.keyUnderEdit != this.editKey && this.keys.indexOf(this.editKey) != -1){
      this.keyValid = false;
      this.validationMessage = "Roll name already exists."
      console.warn(this.validationMessage);
      return;
    }
  }

  cancel(){
    this.validationMessage = "";
    if(this.keyUnderEdit == "*TEMP*"){
      this.deleteRow("*TEMP*");
    }
    this.keyValid = true;
  }

  performSearch(evt){
    let results = Array.prototype.slice.call(document.querySelectorAll('[id=rollKey]')).filter(el => el.innerText.trim().includes(evt.trim()));;
    results[0].scrollIntoView();
  }

  saveChanges(){
    if(confirm("Are you sure you want to keep these changes?")){
      this.masterCopy = this._rolls;
      this.characterRollsChange.emit(this.masterCopy);
    }
    this.keyValid = true;
  }

  revertChanges(){
    if(confirm("Are you sure that you want to undo these changes?")){
      this._rolls = JSON.parse(JSON.stringify(this.masterCopy));
      this.refreshKeys();
    }
  }
}
