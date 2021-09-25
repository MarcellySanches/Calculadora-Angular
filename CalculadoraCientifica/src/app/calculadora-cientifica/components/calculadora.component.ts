import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})

export class CalculadoraComponent implements OnInit {

  private num1!: string;
  private num2!: string;
  private operacao!: string;
  private resultado!: string;

  constructor(private calculadora2Service: CalculadoraService) { }


  ngOnInit() {
    this.limpar();
  }
  limpar(): void {
    this.num1 = '0';
    this.num2 = null;
    this.resultado = null;
    this.operacao = null;
  }
  
  concatenaNumero(numAtual: string, numConcat: string): string {
    if (numAtual === '0' || numAtual === null || numAtual ===  this.resultado) {
      numAtual = '';
    }
    if (numAtual === '' && numConcat === '.') {
      return '0.';
    }
    if (numAtual.indexOf('.') > -1 && numConcat === '.') {
      return numAtual;
    }
    return numAtual + numConcat;
  }
  adicionaNumero(numero: string): void {
    if (this.operacao === null) {
      this.num1 = this.concatenaNumero(this.num1, numero)
    } else {
      this.num2 = this.concatenaNumero(this.num2, numero)
    }
  }
  definirOperacao(operacao): void {
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
    }
    if (this.num2 != null) {
      this.resultado = this.calculadora2Service.calcular(
        parseFloat(this.num1),
        parseFloat(this.num2),
        this.operacao
      ).toString();
    }
  }
  adicionaPi(): void {
    if (this.operacao === null) {
      this.num1 = '3.14';
    } else {
      this.num2 = '3.14';
    }
  }
  calcular(): void {

    if (this.num2 === null && (this.operacao === "+" || this.operacao === "-" || this.operacao === "*" || this.operacao === "/")) {
      return;
    }
    this.resultado = this.calculadora2Service.calcular(
      parseFloat(this.num1),
      parseFloat(this.num2),
      this.operacao
    ).toString();

    this.num1 = this.resultado;
    this.num2 = null;
    this.operacao = null;

  }
  get display(): string {

    if(this.operacao === "√" ){
      return this.operacao+this.num1
    }
    if (this.num2 != null) {
      return this.num1+this.operacao+this.num2
    }
    if(this.operacao !=null){
      return this.num1+this.operacao
    }
    return this.num1.toString();
  }
}