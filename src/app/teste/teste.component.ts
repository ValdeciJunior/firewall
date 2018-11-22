import { Component, OnInit } from '@angular/core';
import {QuestoesService} from '../app-service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {


  constructor(private service: QuestoesService) { }

  ngOnInit() {
     this.service.teste().subscribe(response => console.log(response));
  }

}
