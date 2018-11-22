import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PacoteRegra} from './firewall/pacoteRegra.model';


@Injectable()
export class QuestoesService {
  constructor(private http: HttpClient) {}

  teste(): Observable<any> {
    return this.http.get(`/rest/regra/teste.json`).map(response => <any> response);
  }

  testarRegra(pacoteRegra: PacoteRegra): Observable<string> {
    console.log("TESTE");
    return this.http.post(`/rest/regra/testar.json`, pacoteRegra).map(response => <string> response);
  }
}
