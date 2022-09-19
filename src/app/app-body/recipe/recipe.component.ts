import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IRecipe} from "../../services/recipes.service";

enum Title {
  COMMENTS = 'Комментарии',
  SUM = 'Итого'
}

enum Unit {
  GRAM = 'г',
  ITEM = 'шт.'
}

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
  readonly Title = Title;
  readonly Unit = Unit;

  @Input() recipe: IRecipe;

  recipeForm: FormGroup;
  currentCoefficient: number;
  defaultSum: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.currentCoefficient = this.recipe.defaultCoefficient ?? 1;
    this.defaultSum = this.recipe.ingredients
      .filter(i => i.isConsideredForVolume)
      .map(i => i.quantity)
      .reduce((sum, v) => sum + v);

    this.recipeForm = this.formBuilder.nonNullable.group({
      totalSum: Math.round(this.currentCoefficient * this.defaultSum)
    })

    this.recipeForm.controls['totalSum'].valueChanges.pipe().subscribe( v => {
        this.currentCoefficient = v ? v / this.defaultSum : 1;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipeForm.reset();
  }

}
