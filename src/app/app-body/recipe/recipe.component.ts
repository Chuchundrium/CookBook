import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {IIngredient, IRecipe} from '../../services/recipes.service';

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
export class RecipeComponent implements OnInit, OnDestroy {
  readonly Title = Title;
  readonly Unit = Unit;

  @Input() recipe: IRecipe;

  inEditIngredient: IIngredient | null;
  inEditIngredientId: string | null = null;
  isSumInEdit: boolean;

  currentCoefficient: number;
  defaultSum: number;

  constructor() { }

  ngOnInit(): void {
    this.currentCoefficient = this.recipe.defaultCoefficient ?? 1;

    this.defaultSum = this.recipe.ingredients
      .filter(i => i.isConsideredForVolume)
      .map(i => i.isInPieces ? i.quantity * EGG_WEIGHT_GRAM : i.quantity)
      .reduce((sum, v) => sum + v);
  }

  ngOnDestroy(): void {
  }

  onEditClick(ingredient: IIngredient) {
    if (this.isSumInEdit) {
      this.isSumInEdit = false;
    }
    if (this.inEditIngredientId === ingredient.id) {
      this.inEditIngredient = null;
      this.inEditIngredientId = null;
    } else {
      this.inEditIngredient = ingredient;
      this.inEditIngredientId = ingredient.id;
    }
  }

  onSumEditClick() {
    if (this.inEditIngredientId) {
      this.inEditIngredient = null;
      this.inEditIngredientId = null;
    }
    this.isSumInEdit = !this.isSumInEdit;
  }

  recalculateCoefficient(event: any) {
    const updatedValue = event?.target?.value;
    if (updatedValue && this.inEditIngredient) {
      this.currentCoefficient = updatedValue / this.inEditIngredient.quantity;
    }
    if (updatedValue && this.isSumInEdit) {
      this.currentCoefficient = updatedValue / this.defaultSum;
    }
  }
}
