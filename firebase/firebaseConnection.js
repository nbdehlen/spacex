import * as firebase from "firebase"
import "firebase/firestore"
import firebaseConfig from "./firebaseConfig"

firebase.initializeApp(firebaseConfig)

export const dbh = firebase.firestore()
