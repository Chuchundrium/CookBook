import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppBodyComponent } from './app-body/app-body.component';
import { NavigationComponent } from './app-body/navigation/navigation.component';
import { RecipeComponent } from './app-body/recipe/recipe.component';
import { DescriptionComponent } from './app-body/description/description.component';
import {HttpClientModule} from "@angular/common/http";
import { SeveralLinesPipe } from './shared/pipes/several-lines/several-lines.pipe';
import { RoundPipe } from './shared/pipes/round/round.pipe';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppBodyComponent,
    NavigationComponent,
    RecipeComponent,
    DescriptionComponent,
    SeveralLinesPipe,
    RoundPipe
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
