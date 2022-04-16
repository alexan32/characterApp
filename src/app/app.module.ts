// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

// components
import { TestComponent } from './components/pages/test/test.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { AttributeComponent } from './components/character-sheet/attribute/attribute.component';
import { DerivedStatComponent } from './components/character-sheet/derived-stat/derived-stat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProficiencyToggleComponent } from './components/character-sheet/proficiency-toggle/proficiency-toggle.component';
import { HitDiceComponent } from './components/character-sheet/hit-dice/hit-dice.component';
import { DeathSavesComponent } from './components/character-sheet/death-saves/death-saves.component';
import { CharacterRollsComponent } from './components/character-sheet/character-rolls/character-rolls.component';

// Dialogs
import { CharacterRollsDialog } from './components/character-sheet/character-rolls/character-rolls.component'; 
const routes: Routes = [
  {path: 'test', component:TestComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    CharacterSheetComponent,
    AttributeComponent,
    DerivedStatComponent,
    ProficiencyToggleComponent,
    HitDiceComponent,
    DeathSavesComponent,
    CharacterRollsComponent,
    CharacterRollsDialog
  ],
  imports: [ 
    BrowserModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
