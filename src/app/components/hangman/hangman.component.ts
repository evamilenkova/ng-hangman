import { Component, OnInit } from '@angular/core';
import { HangmanService } from 'src/app/service/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit{

  question:string='';
  questions:string[]=[];
  guesses:string[]=[];
  category:string ='';
 gameFinishedButtonShown:boolean=false;

constructor(private hangmanService:HangmanService){}

  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe( (response) => {
      this.category=response.category,
      this.questions=response.items
      this.pickNewQuestion()
    });
  }

  reset(){
    this.guesses=[];
    this.gameFinishedButtonShown=false;
    this.pickNewQuestion();
  }

  pickNewQuestion(){
    const index=Math.floor(Math.random()*this.questions.length);
    this.question=this.questions[index];
    console.log(this.question)
  }

  guess(letter:string){
    if(!letter || this.guesses.includes(letter)) return;
    else this.guesses=[...this.guesses,letter];
  }

  onGameFinished(){

    this.gameFinishedButtonShown=true;
  }


}
