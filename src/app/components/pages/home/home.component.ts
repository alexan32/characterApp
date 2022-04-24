import { Component, OnInit } from '@angular/core';
import { characterData } from 'src/app/models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file:any;

  character:CharacterData;

  loaded:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openFile(){
    document.getElementById("file").click();
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    if(!this.file.name.endsWith(".json")){
      alert("Invalid file type. Character data should be stored in .json files.");
      return;
    }
    console.log(this.file);
    let fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = ()=>{
      this.handleFileContents(String(fileReader.result));
    }
  }

  handleFileContents(contents:string){
    console.log(contents);
    try{
      this.character = JSON.parse(contents);
    }catch{
      alert("Failed to parse JSON contents. File may be corrupted.");
      return;
    }
    //@## add validation
    this.loaded = true;
  }

  makeNew(){
    this.character = JSON.parse(JSON.stringify(characterData));
    console.log(this.character);
    this.loaded = true;
  }

  downloadCharacter(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.character));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "character.json");
    dlAnchorElem.click();
  }

}
