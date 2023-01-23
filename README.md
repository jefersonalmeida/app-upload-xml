# APP - Upload XML - Frontend

Frontend de projeto para testes

## Author

- **Jeferson Almeida**
  - Github - [jefersonalmeida](https://github.com/jefersonalmeida)
  - Linkedin - [jefersonalmeida](https://www.linkedin.com/in/jefersonalmeida/)
  - Twitter - [____jeferson](https://twitter.com/____jeferson)
  - Email - [me@jeferson.net.br](mailto://me@jeferson.net.br)

### Objetivo

Criar um sistema Web composto de um Front-end SPA (Single Page Application)
Angular e um Back-end Java Spring Boot para envio de arquivos XML e posterior
processamento deles.

### API - Links

- [Repositório - Frontend](https://github.com/jefersonalmeida/app-upload-xml)
- [Repositório - Backend](https://github.com/jefersonalmeida/api-upload-xml)

### Tecnologia

- Angular 15+
- Angular Material 15+
- Typescript 4+
- RxJS 7+
- NGRX 15+
- NodeJS 14+

**Requisitor**;

* Criar uma interface Web para upload de um ou mais arquivos com extensão `.xml`.
* Para o desenvolvimento da interface, deve ser utilizado o tema Indigo do Angular Material.
* Durante o envio do(s) arquivo(s) mostrar um loader para informar ao usuário que
  estão sendo processados, e ao final esse loader deve desaparecer (utilizar
  componentes do Angular Material).
* Os arquivos contêm uma lista de agentes com código e data em formato ISO, e uma
  lista com quatro regiões (SE, S, NE, N) com sete valores numéricos de geração, compra
  e preço médio.
* Não é necessário validar os dados dos arquivos, considere que eles estarão sempre
  corretos e no formato especificado acima.
* Os arquivos devem ser lidos e enviados um a um, sequencialmente.

**Sugestões de Melhorias**;

* Aplicar testes
* Mostrar os registros antes de ser enviado
* Implementar recursos de segurança

---


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
