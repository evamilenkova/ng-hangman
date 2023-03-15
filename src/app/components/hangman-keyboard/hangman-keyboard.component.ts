import { Component,EventEmitter,Input, OnInit,Output,SimpleChanges } from '@angular/core';
import KEY_CHARS from 'src/app/constants/keyCharacters';

interface IKey{
  value:string,
  guessed:boolean;
}


@Component({
  selector: 'app-hangman-keyboard',
  templateUrl: './hangman-keyboard.component.html',
  styleUrls: ['./hangman-keyboard.component.css']
})
export class HangmanKeyboardComponent implements OnInit{

  @Input() question:string="";
  @Output() keyPressed=new EventEmitter<string>();
  keys:IKey[]=[];

  ngOnChanges(changes:SimpleChanges){

    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
    this.addMissingKeys()
  
    }
  }

  addMissingKeys(){

    this.question.split("").forEach(element => {
      if(!(this.keys.map(key=>key.value.toLowerCase()).includes(element.toLowerCase()))){
        this.keys.push({value:element,guessed:false})
      }
    });
  

  }
  ngOnInit(){
    this.keys=KEY_CHARS.split("").map(key=>({value:key, guessed:false}))

  }

  onKeyClick(key:IKey){
    if(key.guessed){return;}
    key.guessed=true;
    this.keyPressed.emit(key.value)

  }
}
