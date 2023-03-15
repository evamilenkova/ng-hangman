import { Component, Input, OnChanges, OnInit,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-question',
  templateUrl: './hangman-question.component.html',
  styleUrls: ['./hangman-question.component.css']
})
export class HangmanQuestionComponent implements OnInit,OnChanges{
@Input() question:string="";
@Input() guesses:string[]=[];
characters:{value:string,guessed:boolean}[]=[];

ngOnInit(): void {
  
}


ngOnChanges(changes:SimpleChanges){

  if (
    changes?.['question']?.currentValue &&
    changes?.['question'].currentValue !== changes?.['question'].previousValue
  ) {
    this.characters=this.question.split('').map(c=>({value:c,guessed:false}));
  }

const guessesCurrentValue=changes['guesses']?.currentValue;

 if(guessesCurrentValue && guessesCurrentValue.length && guessesCurrentValue!=changes['guesses'].previousValue){
const char=[...guessesCurrentValue].pop();
this.characters=this.characters.map((c)=>{
  if(c.value.toLowerCase()===char.toLowerCase()){
    return {value:char,guessed:true};
  }
  return c;
})




          }



}









}
