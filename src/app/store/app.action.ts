import {createAction, props} from '@ngrx/store';
import {FileInterface} from '../interface/xml.interface';

export const Startup = createAction('[@app] Startup');
export const SaveFile = createAction('[@app] SaveFile', props<{ payload: FileInterface[] }>());
export const UploadData = createAction('[@app] UploadData', props<{ payload: FileInterface }>());
export const UploadDataSuccess = createAction('[@app] UploadDataSuccess', props<{ name: string }>());
export const LoadData = createAction('[@app] LoadData');
export const LoadDataSucceess = createAction('[@app] LoadDataSucceess', props<{ payload: any }>());
