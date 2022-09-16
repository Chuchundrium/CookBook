import { Component, OnInit } from '@angular/core';
import {take} from "rxjs";
import {IRecipe, IRecipePreview, RecipesService} from "../services/recipes.service";

enum StateEnum {
  LOADING = 'LOADING',
  EMPTY = 'EMPTY',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.scss']
})
export class AppBodyComponent implements OnInit {
  readonly StateEnum = StateEnum;
  allRecipesState: StateEnum = StateEnum.EMPTY;
  activeRecipeState: StateEnum = StateEnum.EMPTY;
  allRecipes: IRecipePreview[] = [];
  activeRecipe: IRecipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.allRecipesState = StateEnum.LOADING;
    this.recipesService.fetchRecipes()
      .pipe(take(1))
      .subscribe({
        next: recipes => {
          if (!recipes) {
            this.allRecipesState = StateEnum.ERROR;
          } else {
            if (recipes.length > 0) {
              this.allRecipes = recipes;
              this.allRecipesState = StateEnum.SUCCESS;
            }
          }
        },
        error: () => {
          this.allRecipesState = StateEnum.ERROR;
        }
      });
  }

  onUploadRecipe(id: string) {
    this.activeRecipeState = StateEnum.LOADING;
    this.recipesService.fetchRecipeById(id).pipe(take(1)).subscribe({
      next: recipe => {
        if (!recipe) {
          this.activeRecipeState = StateEnum.ERROR;
        } else {
          this.activeRecipe = recipe;
          this.activeRecipeState = StateEnum.SUCCESS;
        }
      },
      error: () => {
        this.activeRecipeState = StateEnum.ERROR;
      }
    });
  }

}
