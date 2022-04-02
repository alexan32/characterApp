import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-proficiency-toggle',
  templateUrl: './proficiency-toggle.component.html',
  styleUrls: ['./proficiency-toggle.component.css']
})
export class ProficiencyToggleComponent implements OnInit {

  constructor() { }

  @Input() proficiencyMultiplier:number = 0;
  @Output() proficiencyMultiplierChange:EventEmitter<number> = new EventEmitter<number>()

  ngOnInit(): void {
  }

  toggle(){
    this.proficiencyMultiplier ++;
    if(this.proficiencyMultiplier > 2){
      this.proficiencyMultiplier = 0;
    }
    this.proficiencyMultiplierChange.emit(this.proficiencyMultiplier)
  }

}
