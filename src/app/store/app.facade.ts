import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as actions from './app.action';
import * as reducer from './app.reducer';
import * as selector from './app.selector';
import {select, Store} from '@ngrx/store';
import {FileInterface, XmlInterface} from '../interface/xml.interface';

@Injectable({providedIn: 'root'})
export class AppFacade {
  readonly files$: Observable<FileInterface[] | undefined>;
  readonly data$: Observable<XmlInterface[] | undefined>;
  readonly loading$: Observable<boolean>;

  constructor(private readonly store: Store<reducer.AppState>) {
    this.files$ = this.store.pipe(select(selector.selectFiles));
    this.data$ = this.store.pipe(select(selector.selectData));
    this.loading$ = this.store.pipe(select(selector.loading));
  }

  startup(): void {
    this.store.dispatch(actions.Startup());
  }

  saveFile(data: FileInterface[]): void {
    this.store.dispatch(actions.SaveFile({payload: data}));
  }

  uploadData(data: FileInterface): void {
    this.store.dispatch(actions.UploadData({payload: data}));
  }

  loadData(): void {
    this.store.dispatch(actions.LoadData());
  }
}
