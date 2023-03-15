import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.css']
})
export class HangmanDisplayComponent implements OnInit,OnChanges{
@Input() guesses:string[]=[];
@Input() question:string="";
@Output() gameFinished=new EventEmitter<boolean>();

  MAX_MISTAKES=7;
  mistakes_remaining=this.MAX_MISTAKES;
  success:boolean=false;
  question_remaining:string=""


  ngOnChanges(changes:SimpleChanges){
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      this.mistakes_remaining = this.MAX_MISTAKES;
      this.success = false;
      this.question_remaining=this.question;
    }
    const guessesCurrentValue=changes['guesses']?.currentValue;
   if(guessesCurrentValue && guessesCurrentValue.length && guessesCurrentValue!=changes['guesses'].previousValue){
    const char=[...guessesCurrentValue].pop()
    this.checkGuess(char) 
  }
  }

  checkGuess(letter:string){
    let m=this.isMistake(letter);
    this.mistakes_remaining-=m;
    if(!m){

      let re = new RegExp(`${letter}`, "gi");
      this.question_remaining=this.question_remaining.replace(re,"")

    }
    if(this.question_remaining==="") {
      this.success=true
    }
    if(this.success || this.mistakes_remaining===0){
      this.gameFinished.emit(this.success)
    }

    
  }
  isMistake(letter:string){
    return this.question?.toLowerCase().includes(letter?.toLowerCase()) ? 0:1;
  }

  ngOnInit(): void {
  
  }

}
