import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FileInput} from 'ngx-material-file-input';
import * as xml2js from 'xml2js';
import {FileInterface, XmlInterface} from '../interface/xml.interface';
import {AppFacade} from '../store/app.facade';
import {ReplaySubject, take, takeUntil} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  formUpload = this.fb.group({
    file_xml: this.fb.control(null, [
      Validators.required,
    ]),
  });

  readonly files$ = this.appFacade.files$;
  readonly loading$ = this.appFacade.loading$;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private readonly fb: FormBuilder,
    private readonly appFacade: AppFacade,
    private readonly _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void {
  }

  prepareData() {
    if (this.formUpload) {
      const data: FileInput = (this.formUpload.get('file_xml')?.value as unknown as FileInput);
      data.files.forEach(file => this.extractDataAndSave(file));
    }
  }

  onCancel() {
    this.appFacade.startup();
  }

  onSubmit() {
    this.files$.pipe(
      take(1),
      takeUntil(this.destroyed$),
    ).subscribe({
      next: (res: any) => res?.forEach((file: FileInterface) => this.appFacade.uploadData(file)),
      complete: () => {
        this.formUpload.reset();
        this.formUpload.markAsDirty();
      },
    });
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action);
  }

  private extractDataAndSave(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const arr = reader.result.split(',');
        const bstr = atob(arr[1]);
        this.parseXML(bstr).then(result => {
          this.appFacade.saveFile([{name: file.name, data: result}]);
        });
      }
    };
  }

  private parseXML(data: string): Promise<XmlInterface[]> {
    return new Promise(resolve => {
      let index: string | number;
      const xmlData: XmlInterface[] = [];

      const parser = new xml2js.Parser({
        trim: true,
        explicitArray: true,
      });

      parser.parseString(data, function (err, result) {
        const obj = result.agentes;
        for (index in obj.agente) {
          const item = obj.agente[index];
          xmlData.push({
            code: item.codigo[0],
            date: item.data[0],
            regions: item.regiao.map((r: any) => ({
              acronym: r.$.sigla,
              purchase: r.compra[0].valor.map((v: any) => parseFloat(v)),
              generation: r.geracao[0].valor.map((v: any) => parseFloat(v)),
              average: r.precoMedio[0].valor.map((_: any) => parseFloat('0')),
            })),
          });
        }
        resolve(xmlData);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
