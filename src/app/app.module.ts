import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './components/pages/test/test.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { AttributeComponent } from './components/character-sheet/attribute/attribute.component';
import { DerivedStatComponent } from './components/character-sheet/derived-stat/derived-stat.component';

const routes: Routes = [
  {path: 'test', component:TestComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    CharacterSheetComponent,
    AttributeComponent,
    DerivedStatComponent
  ],
  imports: [ 
    BrowserModule, 
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
