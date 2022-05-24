import { Component, h, State } from '@stencil/core';
import firebase from 'firebase/compat/app';
import { getFunctions, httpsCallable } from "firebase/functions";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false
})
export class AppHome {
  wordTypes: Array<string> = ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'determiner', 'exclamation'];
  @State() wordList: any = [];

  firebaseConfig = {
      apiKey: 'AIzaSyCbr67VqdY8PDlXvnEk-KzOUx5FtFjLxEc',
      authDomain: 'simple-word-builder.firebaseapp.com',
      projectId: 'simple-word-builder',
      storageBucket: 'simple-word-builder.appspot.com',
      messagingSenderId: '1024242730155',
      appId: '1:1024242730155:web:b3aed6fd78f3150bbca3ee'
  };
  componentDidLoad(){
    this.getWordList("noun");
  }

  getWordList(wordType: string) {

    const app = firebase.initializeApp(this.firebaseConfig);
    const functions = getFunctions(app);
    const getSecificWordList = httpsCallable(functions, 'getWordTypeList');
    getSecificWordList (wordType)
    .then((result) => {
      // Read result of the Cloud Function.
      /** @type {any} */
      this.wordList = result.data;
    }).catch((error)=>{
      console.error("error: ",error);
    })
  }

  uploadSentence(){
    const app = firebase.initializeApp(this.firebaseConfig);
    const functions = getFunctions(app);
    const writeSentence  = httpsCallable(functions, 'sentence');
    writeSentence (window.document.getElementById('textarea').textContent)
    .then(() => {
      window.document.getElementById('textarea').textContent = "";
    }).catch((error)=>{
      console.error("error: ",error);
    })
  }

  append(word: string){
    window.document.getElementById('textarea').textContent += " "+word;
  }

  render() {
    return (
      <div class="app-home">
        <div class="wordTypeButton-container">
          {
            this.wordTypes.map((type)=>
              <div class="wordTypeButton" onClick={()=> this.getWordList(type)}>
                {type}
              </div>
            )
          }
        </div>
        <div class="wordList-container">
          {
            this.wordList.map((word)=>
              <div class="word" onClick={()=> this.append(word?.word)}>
                <p>{word?.word}</p>
              </div>
            )
          }
        </div>
        <textarea id="textarea"></textarea>
        <div class="submit" onClick={()=> this.uploadSentence()}><p >submit</p></div>
      </div>
    );
  }
}