import * as functions from "firebase-functions";
import { initializeApp } from 'firebase/app';
import { collection, DocumentData, getDocs, getFirestore, query } from "firebase/firestore";
const cors = require('cors');

const firebaseConfig = {
    apiKey: 'AIzaSyBTe3hl2t7RJBUrddRMqRedTWtKlyO4qYA',
    authDomain: 'umuhle-b236e.firebaseapp.com',
    projectId: 'umuhle-b236e',
    storageBucket: 'umuhle-b236e.appspot.com',
    messagingSenderId: '372747063656',
    appId: '1:372747063656:web:7aff418ed3be73d1f046dd'
};

async function getWordTypeList(wordType:string, response: functions.Response<any>){
    const firestoreObject = getFirestore(initializeApp(firebaseConfig));
    const collectionFromDatabase = collection(firestoreObject, wordType);
    const queryToGetWordTypes = query(collectionFromDatabase);
    const querySnapshot = await getDocs(queryToGetWordTypes);
    const listOfWordsWithMatchingType: DocumentData[] = [];
    // response.send(querySnapshot);
    querySnapshot.forEach((doc) => {  
        listOfWordsWithMatchingType.push(doc.data());
    });
    response.send(listOfWordsWithMatchingType);
}

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript

export const noun = functions.https.onRequest(async (request, response) => {
    cors(request, response, () => {
        functions.logger.info("noun!", {structuredData: true});
        // response.send("noun")
        getWordTypeList('noun',response);
    });
});

export const verb = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        functions.logger.info("verb!", {structuredData: true});
        getWordTypeList('verb',response);
    });
});

export const sentence = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        functions.logger.info("sentence", {structuredData: true});
        response.send("sentence");
        return "sentence";
    });
});