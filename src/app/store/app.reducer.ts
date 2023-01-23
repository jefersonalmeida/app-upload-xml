import {Action, ActionReducer, ActionReducerMap, createReducer, MetaReducer, on} from '@ngrx/store';
import * as actions from './app.action';
import {Entity} from '../interface/entity.interface';
import {InjectionToken} from '@angular/core';
import {FileInterface, XmlInterface} from '../interface/xml.interface';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('Root reducers token', {
  factory: () => ({
    app: appReducer,
  }),
});

export interface FeatureState {
  files: Entity<FileInterface>;
  data: Entity<XmlInterface>;
  loading: boolean;
}

export interface AppState {
  app: FeatureState;
}

const initialState: FeatureState = {
  files: {},
  data: {},
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(actions.Startup, (_): FeatureState => ({...initialState})),
  on(actions.LoadData, (_): FeatureState => ({...initialState})),
  on(actions.SaveFile, (state, action): FeatureState => ({
    ...state,
    files: action.payload.reduce(
      (acc, current) => ({...acc, [current.name]: current}),
      state.files,
    ),
    data: {},
  })),
  on(actions.UploadData, (state, _): FeatureState => ({
    ...state,
    loading: true,
    data: {},
  })),
  on(actions.UploadDataSuccess, (state, action): FeatureState => ({
    ...state,
    loading: false,
    data: {},
    files: Object.keys(state.files)
      .filter(key => key !== action.name)
      .reduce((acc, key) => ({...acc, [key]: state.files[key]}), {}),
  })),
  on(actions.LoadData, (state, action): FeatureState => ({
    ...state,
    loading: true,
    data: {},
  })),
  on(actions.LoadDataSucceess, (state, action): FeatureState => ({
    ...state,
    loading: false,
    // data: action.result.data.reduce(
    //   (acc, current) => ({...acc, [current.id]: current}),
    //   state.data,
    // ),
  })),
);

export function appReducer(state: FeatureState | undefined, action: Action): FeatureState {
  return reducer(state, action);
}

export const metaReducers: MetaReducer<AppState>[] = [clearState];

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action): AppState => {
    if (action.type === '[@app] Startup') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
