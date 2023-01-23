import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FileInput} from 'ngx-material-file-input';
import * as xml2js from 'xml2js';
import {FileInterface, XmlInterface} from '../interface/xml.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppService} from '../app.service';
import {concatMap, delay, from, mergeMap, of} from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formUpload = this.fb.group({
    file_xml: this.fb.control(null, [
      Validators.required,
    ]),
  });

  files: FileInterface[] = [];
  loading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly appService: AppService,
  ) {

  }

  ngOnInit(): void {
  }

  prepareData() {
    if (!this.formUpload) {
      return;
    }
    const data: FileInput = (this.formUpload.get('file_xml')?.value as unknown as FileInput);
    data.files.forEach(file => this.extractDataAndSave(file));
  }

  onSubmit() {
    if (!this.files.length) {
      return;
    }

    this.loading = true;

    const send = from(this.files).pipe(
      concatMap(item => of(item).pipe(delay(2000))),
      mergeMap(res => this.appService.upload(res)),
    );

    send.subscribe({
      next: () => this.openSnackBar(`Arquivos enviado com sucesso`),
      error: () => {
        this.openSnackBar(`Erro ao enviar o arquivo`);
        this.files = [];
        this.loading = false;
      },
      complete: () => {
        this.files = [];
        this.loading = false;
      },
    })
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action);
  }

  private extractDataAndSave(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const arr = reader.result.split(',');
        const bstr = atob(arr[1]);
        this.parseXML(bstr).then(result => {
          this.files.push({name: file.name, data: result});
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
}
