import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true,
})
export class AppHome {
  wordTypes: Array<string> = ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'determiner', 'exclamation'];
  @State() wordList: Array<string> = ['one','two','three','four','five','six'];

  componentDidLoad(){
    this.setWordList("noun");
  }

  setWordList(wordType: string) {
    console.log("setWordList");
    console.log("wordType: ",wordType);
    const request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log("request: ",request);
          console.log("request.responseText: ",request.responseText);
        } else {
          console.error('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
        }
      }
    }

    request.open('Get', 'https://us-central1-simple-word-builder.cloudfunctions.net/'+wordType);

    request.setRequestHeader('Access-Control-Allow-Headers', '*');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    // Start the ajax request.
    request.send();
  }

  uploadSentence(sentence: string){
    // Prepare an ajax
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {

        if (request.status === 200) {
          console.log("request.responseText: ",request.responseText);
        } else {
          console.error('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
        }
      }
    }
    request.open('Post', 'https://us-central1-simple-word-builder.cloudfunctions.net/sentence');

    // request.setRequestHeader('Access-Control-Allow-Headers', '*');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');

    // Start the ajax request.
    request.send(sentence);
  }

  render() {
    return (
      <div class="app-home">
        <div class="wordTypeButton-container">
          {
            this.wordTypes.map((type)=>
              <div class="wordTypeButton" onClick={()=> this.setWordList(type)}>
                {type}
              </div>
            )
          }
        </div>
        <div class="wordList-container">
          {
            this.wordList.map((word)=>
              <div class="word">
                <p>{word}</p>
              </div>
            )
          }
        </div>
        <textarea></textarea>
        <div class="submit" onClick={()=> this.uploadSentence('sentence')}><p >submit</p></div>
      </div>
    );
  }
}
