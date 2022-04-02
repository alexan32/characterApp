import { Component, Input, OnInit } from '@angular/core';
import { Character, DerivedStat } from 'src/app/models/character';

@Component({
  selector: 'app-derived-stat',
  templateUrl: './derived-stat.component.html',
  styleUrls: ['./derived-stat.component.css']
})
export class DerivedStatComponent implements OnInit {

  @Input() character:Character = null;
  @Input() isSave:boolean = false;
  @Input() key: string = "";

  stat:DerivedStat = null;
  title:string = "";

  constructor() { }

  ngOnInit(): void {
    let temp = this.key.split("_").join(" ");
    this.title = temp.charAt(0).toUpperCase() + temp.slice(1);
    if(this.isSave && this.character.saves.hasOwnProperty(this.key)){
      this.stat = this.character.saves[this.key];
    }else if(this.character.skills.hasOwnProperty(this.key)){
      this.stat = this.character.skills[this.key];
    }
  }

  getScore(){
    return this.stat.getScore(this.character.proficiencyBonus);
  }

  logProficiencyChange(){
    console.log(`${this.title} proficiency multiplier: ${this.stat.proficiencyMultiplier}`)
  }

}
