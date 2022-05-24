import * as functions from "firebase-functions";
import { initializeApp } from 'firebase/app';
import { addDoc, collection, DocumentData, getDocs, getFirestore, query } from "firebase/firestore";

// API KEYS
const firebaseConfig = {
    apiKey: 'AIzaSyCbr67VqdY8PDlXvnEk-KzOUx5FtFjLxEc',
    authDomain: 'simple-word-builder.firebaseapp.com',
    projectId: 'simple-word-builder',
    storageBucket: 'simple-word-builder.appspot.com',
    messagingSenderId: '1024242730155',
    appId: '1:1024242730155:web:b3aed6fd78f3150bbca3ee'
};

// getWordTypeList() returns an array of words of a certain type
export const getWordTypeList = functions.https.onCall(async (data,context)=>{

    const firestoreObject = getFirestore(initializeApp(firebaseConfig));
    const collectionFromDatabase = collection(firestoreObject, data);
    const queryToGetWordTypes = query(collectionFromDatabase);
    const querySnapshot = await getDocs(queryToGetWordTypes);
    const listOfWordsWithMatchingType: DocumentData[] = [];

    querySnapshot.forEach((doc) => {  
        listOfWordsWithMatchingType.push(doc.data());
    });
    return listOfWordsWithMatchingType;
});

// sentence() writes sentences to the database
export const sentence = functions.https.onCall((data,context)=>{
    addDoc(collection(getFirestore(initializeApp(firebaseConfig)), "sentence"), {
        sentence: data
    });
});