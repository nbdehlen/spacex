import * as firebase from "firebase"
import "firebase/firestore"
import firebaseConfig from "./firebaseConfig"

firebase.initializeApp(firebaseConfig)
const firebaseConnection = firebase.firestore()

export default firebaseConnection
