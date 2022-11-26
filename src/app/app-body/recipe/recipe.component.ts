import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from '../../services/recipes.service';

enum Title {
  COMMENTS = 'Комментарии',
  SUM = 'Итого, г'
}

enum Unit {
  GRAM = 'г',
  ITEM = 'шт.'
}

const EGG_WEIGHT_GRAM: Readonly<number> = 60;

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  readonly Title = Title;
  readonly Unit = Unit;

  @Input() recipe: IRecipe;

  currentCoefficient: number;
  defaultSum: number;

  constructor() { }

  ngOnInit(): void {
    this.setCurrentCoefficientToDefault();

    this.defaultSum = this.recipe.ingredients
      .filter(i => i.isConsideredForVolume)
      .map(i => i.isInPieces ? i.quantity * EGG_WEIGHT_GRAM : i.quantity)
      .reduce((sum, v) => sum + v);
  }

  recalculateCoefficient(event: any, originalValue: number) {
    const updatedValue = event?.target?.value;
    if (updatedValue) {
      this.currentCoefficient = updatedValue / originalValue
    }
  }

  setCurrentCoefficientToDefault() {
    this.currentCoefficient = this.recipe.defaultCoefficient ?? 1;
  }
}
