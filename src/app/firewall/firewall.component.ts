import { Component, OnInit } from '@angular/core';
import {Regra} from './regra.model';
import {Pacote} from './pacote.model';
import {PacoteRegra} from './pacoteRegra.model';
import {QuestoesService} from '../app-service';
import {TextMaskModule} from 'angular2-text-mask';
import { Angular2Txt } from 'angular2-txt/Angular2-txt';


@Component({
  selector: 'app-firewall',
  templateUrl: './firewall.component.html',
  styleUrls: ['./firewall.component.css']
})
export class FirewallComponent implements OnInit {
  pacote: Pacote;
  pacoteE: Pacote;
  pacotes: Pacote[] = [];
  regras: Regra[] = [];
  regra: Regra;
  regraE: Regra;
  origemTest: boolean;
  destinoTest: boolean;
  direcaoTest: boolean;
  protocoloTest: boolean;
  portaTest: boolean;
  pacoteRegra: PacoteRegra;
  fileText : string;
  numero:number;

  public json;

  textRegra: string;

  constructor(private service: QuestoesService) { }

  ngOnInit() {
    this.regra = new Regra();
    /*
    this.regra.id = 1;
    this.regra.nome = 'Regra 1';
    this.regra.acao = 'Permitir';
    this.regra.portaInicial = 1;
    this.regra.portaFinal = 500;
    this.regra.protocolo = '*';
    this.regra.direcao = 'd';
    this.regra.origem = '*';
    this.regra.destino = '*';
    */
    this.pacote = new Pacote();
  }

  refresh(){
    window.location.reload();
  }

  testarRegra() {
    for (let i = 0; i < this.pacotes.length; i++) {
      for (let o = 0; o < this.regras.length; o++) {
        this.pacoteE = this.pacotes[i];
        this.regraE = this.regras[o];
        if (this.regraE.origem === this.pacoteE.origem || this.regraE.origem === '*') {
          this.origemTest = true;
        }else{
          this.origemTest = false;
        }
        if (this.regraE.destino === this.pacoteE.destino || this.regraE.destino === '*') {
          this.destinoTest = true;
        }else{
          this.destinoTest = false;
        }
        if (this.regraE.direcao.toString() === this.pacoteE.direcao.toString() || this.regraE.direcao === '*') {
          this.direcaoTest = true;
        }else{
          this.direcaoTest = false;
        }
        if (this.regraE.protocolo === this.pacoteE.protocolo || this.regraE.protocolo === '*') {
          this.protocoloTest = true;
        } else {
          this.protocoloTest = false;
        }
        if (this.pacoteE.porta >= this.regraE.portaInicial && this.pacoteE.porta <= this.regraE.portaFinal) {
          this.portaTest = true;
        }else{
          this.portaTest = false;
        }
        if(this.origemTest && this.destinoTest && this.direcaoTest && this.protocoloTest && this.portaTest){
          alert(`O pacote de id: ${this.pacoteE.id} Passou pela regra: ${this.regraE.nome} AÇÃO: ${this.regraE.acao}`);
          break;
        }else{
        }
      }
    }
  }

  getPacote(event){
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.fileText = reader.result.toString().split("\r");
      for(let i = 0; i < me.fileText.length; i++){
        if(i == 0){
          me.numero = me.fileText[i];
        }else if(me.fileText[i] == me.fileText[me.fileText.length - 1]){
          console.log("fim do arquivo")        
        }else{
            me.pacote.id = Number.parseInt(me.fileText[i].split(",")[0]);
            me.pacote.origem = me.fileText[i].split(",")[1];
            me.pacote.destino = me.fileText[i].split(",")[2];
            me.pacote.protocolo = me.fileText[i].split(",")[3];
            me.pacote.porta = Number.parseInt(me.fileText[i].split(",")[4]);
            me.pacote.direcao = me.fileText[i].split(",")[5];
            me.pacote.dados = me.fileText[i].split(",")[6];
            me.pacotes.push(me.pacote);
            me.pacote = new Pacote();
            console.log(me.fileText[i])
            console.log(me.fileText.length)
            console.log(me.fileText[i] == me.fileText[me.fileText.length - 1])
        }
        
      }
      if(me.pacotes.length == me.numero){
        alert(`Passou`);
      }else{
        alert(`Não Passou`);
        me.pacotes = [];
      }
      console.log(me.pacotes.length)
      console.log(me.numero)
    }
  }

/*
  getPacote(event){
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.fileText = reader.result.toString().split(',');
      me.pacote.id = Number.parseInt(me.fileText[0].replace('"', '').replace('"', ''));
      me.pacote.origem = me.fileText[1].replace('"', '').replace('"', '');
      me.pacote.destino = me.fileText[2].replace('"', '').replace('"', '');
      me.pacote.protocolo = me.fileText[3].replace('"', '').replace('"', '');
      me.pacote.porta = Number.parseInt(me.fileText[4].replace('"', '').replace('"', ''));
      me.pacote.direcao = me.fileText[5].replace('"', '').replace('"', '');
      me.pacote.dados = me.fileText[6].replace('"', '').replace('"', '');
      me.pacotes.push(me.pacote);
      me.pacote = new Pacote();
      me.fileText = null;
    }
  }
*/
getRegra(event){
  var reader = new FileReader();
  reader.readAsText(event.srcElement.files[0]);
  var me = this;
  reader.onload = function () {
    me.fileText = reader.result.toString().split("\r");
    for(let i = 0; i < me.fileText.length; i++){
      if(i == 0){
        me.numero = me.fileText[i];
      }else if(me.fileText[i] == me.fileText[me.fileText.length - 1]){
        console.log("fim do arquivo")        
      }else{
          me.regra.id = Number.parseInt(me.fileText[i].split(",")[0]);
          me.regra.nome = me.fileText[i].split(",")[1];
          me.regra.origem = me.fileText[i].split(",")[2];
          me.regra.destino = me.fileText[i].split(",")[3];
          me.regra.direcao = me.fileText[i].split(",")[4];
          me.regra.protocolo = me.fileText[i].split(",")[5];
          me.regra.portaInicial = me.fileText[i].split(",")[6] === "*"? 0 : Number.parseInt(me.fileText[i].split(",")[6]);
          me.regra.portaFinal = me.fileText[i].split(",")[7] === "*"? 65535 : Number.parseInt(me.fileText[i].split(",")[7]);
          me.regra.acao = me.fileText[i].split(",")[8];
          me.regras.push(me.regra);
          me.regra = new Pacote();
          console.log(me.fileText[i])
          console.log(me.fileText.length)
          console.log(me.fileText[i] == me.fileText[me.fileText.length - 1])
      }
      
    }
  
    console.log(me.pacotes.length)
    console.log(me.numero)
  }
}
/*
  getRegra(event){
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.fileText = reader.result.toString().split(',');
      me.regra.id = Number.parseInt(me.fileText[0].replace('"', '').replace('"', ''));
      me.regra.nome = me.fileText[1].replace('"', '').replace('"', '');
      me.regra.origem = me.fileText[2].replace('"', '').replace('"', '');
      me.regra.destino = me.fileText[3].replace('"', '').replace('"', '');
      me.regra.direcao = me.fileText[4].replace('"', '').replace('"', '');
      me.regra.protocolo = me.fileText[5].replace('"', '').replace('"', '');
      me.regra.portaInicial = Number.parseInt(me.fileText[6].replace('"', '').replace('"', ''));
      me.regra.portaFinal = Number.parseInt(me.fileText[7].replace('"', '').replace('"', ''));
      me.regra.acao = me.fileText[8].replace('"', '').replace('"', '');
      me.regras.push(me.regra);
      me.regra = new Regra();
      me.fileText = null;
    }
  }
*/
  addRegra() {
    this.regras.push(this.regra);
    this.regra = new Regra();
    console.log(this.regras);
  }
  excluirRegra(regra: Regra) {
    const index: number = this.regras.indexOf(regra);
    if (index !== -1) {
      this.regras.splice(index, 1);
    }
  }

  subirPrimeiraRegra(regra: Regra) {
    const index: number = this.regras.indexOf(regra);
    if (index !== -1) {
      this.regras.splice(index, 1);
    }
    this.regras.splice(0, 0, regra);
  }

  descerUltimaRegra(regra: Regra) {
    const index: number = this.regras.indexOf(regra);
    if (index !== -1) {
      this.regras.splice(index, 1);
    }
    this.regras.push(regra);
  }

  public exportarRegra(regra: Regra): void {
    this.json = [{id: regra.id, nome: regra.nome, origem: regra.origem, destino: regra.destino, direcao: regra.direcao, protocolo: regra.protocolo, portaInicial: regra.portaInicial, portaFinal: regra.portaFinal, acao: regra.acao}]
    new Angular2Txt(this.json, `Regra-${regra.id}-${regra.nome}`);
  }

  public exportarPacote(pacote: Pacote): void {
    this.json = [{id: pacote.id, origem: pacote.origem, destino: pacote.destino, protocolo: pacote.protocolo, porta: pacote.porta, direcao: pacote.direcao, dados: pacote.dados}]
    new Angular2Txt(this.json, `Pacote-${pacote.id}`);
  }

  addPacote() {
    this.pacotes.push(this.pacote);
    this.pacote = new Pacote();
    console.log(this.pacotes);
  }

  excluirPacote(pacote:Pacote) {
    const index: number = this.pacotes.indexOf(pacote);
    if (index !== -1) {
      this.pacotes.splice(index, 1);
    }
  }

}
