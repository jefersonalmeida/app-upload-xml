import {createSelector} from '@ngrx/store';
import {AppState, FeatureState} from './app.reducer';
import {Entity} from '../interface/entity.interface';
import {FileInterface, XmlInterface} from '../interface/xml.interface';

export const selectFeatureState = (state: AppState) => state.app;

export const loading = createSelector(selectFeatureState, state => state.loading);

export const selectFiles = createSelector(selectFeatureState, (state: FeatureState) => {
  const {files}: { files: Entity<FileInterface> } = state;
  return files ? Object.keys(files).map(id => files[id]) : [];
});

export const selectData = createSelector(selectFeatureState, (state: FeatureState) => {
  const {data}: { data: Entity<XmlInterface> } = state;
  return Object.keys(data).map(id => data[id]);
});
