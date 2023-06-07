import { Component, OnInit } from '@angular/core';
import { ApiVeiculosService } from './services/api-veiculos.service';
import { Observable } from 'rxjs';
import { Veiculo } from './models/veiculo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'front-end-veiculos';

}
