import { Component, Input, OnInit } from '@angular/core';
import { Attribute, Character } from 'src/app/models/character';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input() character:Character;
  @Input() attribute:string = "strength";
  title:string = ""; 
  score:number = 0;
  _attribute:Attribute = null;

  constructor() { }

  ngOnInit(): void {
    this._attribute = this.character.attributes[this.attribute];
    this.title = this.attribute.charAt(0).toUpperCase() + this.attribute.slice(1);
    this.score = this._attribute.getScore()
  }

  updateAttribute(){
    let newBase = this.score - this._attribute.getBonus();    // calculate new base (total - bonus)
    this._attribute.setBase(newBase);                         // attribute class will handle validation and correction if base too high or low
    this.score = this._attribute.getScore();                  // update local value
    console.log(`${this.title}: ${this.score}`);
  }


}
