import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

const URL: string = 'https://quk.azurewebsites.net';
const RECIPES: string = '/recipes';
const ALL: string = '/all';

export interface IIngredient {
  name: string
  id: string
  quantity: number
  isInPieces: boolean
  isConsideredForVolume: boolean
}

export interface IRecipe {
  name: string
  id: string
  ingredients: IIngredient[]
  defaultCoefficient: number | null
  comment: string
  tags: string[]
}

export interface IRecipePreview {
  id: string
  name: string
  tags: string[]
}

interface IGetRecipesResponse {
  satisfyingRecipes: IRecipePreview[]
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  fetchRecipes() {
    return this.http.get<IGetRecipesResponse>(`${URL}${RECIPES}${ALL}`)
      .pipe(map(resp => resp.satisfyingRecipes)
      );

  }

  fetchRecipeById(id: string) {
    return this.http.get<IRecipe>(`${URL}${RECIPES}/${id}`);
  }
}
