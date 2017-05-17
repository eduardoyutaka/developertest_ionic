import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiUrl: string;
  private version: string;
  private indexRestaurantUrl: string;

  constructor(private http: Http) {
    this.apiUrl = 'http://localhost:4000/';
    this.version = 'api/v1/';
    this.indexRestaurantUrl = this.apiUrl+this.version+'restaurant';
  }

  getIndexRestaurants(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    headers.append('Authorization', 'Token token='+localStorage.getItem('cpf'));
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.indexRestaurantUrl, options)
      .map(res => res);
  }

  // postCreateResponsavelCoordenadorMensagem(mensagem: Object): Observable<any> {
  //   let bodyString = JSON.stringify(mensagem); // Stringify payload
  //   let headers = new Headers({ 'Content-Type': 'text/plain' });
  //   headers.append('Authorization', 'Token token='+localStorage.getItem('cpf'));
  //   let options = new RequestOptions({ headers: headers});

  //   this.createMensagemUrl = this.apiUrl+this.version+'responsavel/aluno/'+mensagem['aluno_id']+'/coordenador/'+mensagem['coordenador_id'];

  //   return this.http.post(this.createMensagemUrl, bodyString, options)
  //     .map(res => {
  //       // Service message commands
  //       this.novaMensagemSource.next(res.json())
  //     });
  // }
}
