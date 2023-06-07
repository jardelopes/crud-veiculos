import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Veiculo } from 'src/app/models/veiculo';
import { ApiVeiculosService } from 'src/app/services/api-veiculos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  $veiculos!: Observable<Veiculo[]>;
  veiculoForm!: FormGroup;
  veiculoSelecionado!: Veiculo;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiVeiculosService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.atualizarVeiculos();
    this.veiculoForm = this.formBuilder.group({
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: [undefined, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
    console.log(this.veiculoForm)

  }

  atualizarVeiculos() {
    this.$veiculos = this.apiService.getAllVeiculos().pipe(
      catchError((error: any) => {
        this.errorMessage = 'Erro ao obter a lista de veículos. Tente novamente mais tarde.';
        console.error('Erro ao obter a lista de veículos:', error);
        return throwError(error);
      })
    );
  }

  adicionarVeiculo() {
    let veiculo: Veiculo = this.veiculoForm.value;
    this.apiService.postVeiculo(veiculo).subscribe(
      () => {
        this.atualizarVeiculos();
        this.successMessage = 'Veículo adicionado com sucesso.';
        this.veiculoForm.reset();
      },
      (error: any) => {
        this.errorMessage = 'Erro ao adicionar veículo. Tente novamente mais tarde.';
        console.error('Erro ao adicionar veículo:', error);
      }
    );
  }

  removerVeiculo(id: any) {
    this.apiService.deleteVeiculo(id).subscribe(
      () => {
        this.atualizarVeiculos();
        this.successMessage = 'Veículo removido com sucesso.';
      },
      (error: any) => {
        this.errorMessage = 'Erro ao remover veículo. Tente novamente mais tarde.';
        console.error('Erro ao remover veículo:', error);
      }
    );
  }

  atualizarVeiculo() {
    let veiculo: Veiculo = { ...this.veiculoSelecionado, ...this.veiculoForm.value };
    this.apiService.updateVeiculo(this.veiculoSelecionado._id, veiculo).subscribe(
      () => {
        this.atualizarVeiculos();
        this.successMessage = 'Veículo atualizado com sucesso.';
        this.veiculoForm.reset();
      },
      (error: any) => {
        this.errorMessage = 'Erro ao atualizar veículo. Tente novamente mais tarde.';
        console.error('Erro ao atualizar veículo:', error);
      }
    );
  }

  abrirModalEdicao(veiculo: Veiculo) {
    this.veiculoSelecionado = { ...veiculo };
    this.veiculoForm.patchValue(this.veiculoSelecionado);
  }
}
