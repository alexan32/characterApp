import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-derived-stat',
  templateUrl: './derived-stat.component.html',
  styleUrls: ['./derived-stat.component.css']
})
export class DerivedStatComponent implements OnInit {

  @Input() character:Character;
  @Input() isSave:boolean = false;
  @Input() key: string = "";

  title:string = "";

  constructor() { }

  ngOnInit(): void {
    let temp = this.key.split("_").join(" ");
    this.title = temp.charAt(0).toUpperCase() + temp.slice(1);
    console.log(this.character);
  }

  getScore(){
    if(!this.character){
      return 0;
    }
    if(this.isSave && this.character.saves.hasOwnProperty(this.key)){
      return this.character.saves[this.key].getScore(0);
    }else if(this.character.skills.hasOwnProperty(this.key)){
      return this.character.skills[this.key].getScore(0);
    }
    return 0;
  }

}
