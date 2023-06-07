import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root',
})
export class ApiVeiculosService {
  _url = 'http://localhost:3000/api/veiculo';
  constructor(private http: HttpClient) {}
  getAllVeiculos() {
    return this.http.get<Veiculo[]>(this._url).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError((error: any) => {
        console.error('Erro ao obter a lista de veículos:', error);
        return throwError(
          'Ocorreu um erro ao obter a lista de veículos. Tente novamente mais tarde.'
        );
      })
    );
  }

  postVeiculo(veiculo: Veiculo) {
    return this.http.post(this._url, veiculo).pipe(
      map((res: any) => {
        console.log(res);
      }),
      catchError((error: any) => {
        console.error('Erro ao adicionar veículo:', error);
        return throwError(
          'Ocorreu um erro ao adicionar o veículo. Tente novamente mais tarde.'
        );
      })
    );
  }

  deleteVeiculo(id: any) {
    console.log(this._url + '/' + id);
    return this.http.delete(this._url + '/' + id).pipe(
      map((res: any) => {
        console.log(res);
      }),
      catchError((error: any) => {
        console.error('Erro ao remover veículo:', error);
        return throwError(
          'Ocorreu um erro ao remover o veículo. Tente novamente mais tarde.'
        );
      })
    );
  }

  updateVeiculo(id: any, veiculo: Veiculo) {
    console.log(this._url + '/' + id);
    return this.http.put(this._url + '/' + id, veiculo).pipe(
      map((res: any) => {
        console.log(res);
      }),
      catchError((error: any) => {
        console.error('Erro ao atualizar veículo:', error);
        return throwError(
          'Ocorreu um erro ao atualizar o veículo. Tente novamente mais tarde.'
        );
      })
    );
  }
}
