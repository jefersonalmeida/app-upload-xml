import {Injectable} from '@angular/core';
import * as actions from './app.action';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppService} from '../app.service';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AppEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly appService: AppService) {
  }

  UploadData$ = createEffect(() => this.actions$.pipe(
    ofType(actions.UploadData),
    mergeMap(action => this.appService.upload(action.payload).pipe(
      map(_ => actions.UploadDataSuccess({name: action.payload.name})),
    )),
  ));
}
