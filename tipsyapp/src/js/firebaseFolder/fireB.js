import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp({
	apiKey: firebaseConfig.apiKey,
	authDomain: firebaseConfig.authDomain,
	databaseURL: firebaseConfig.databaseURL,
	projectId: firebaseConfig.projectId,
	storageBucket: firebaseConfig.storageBucket,
	messagingSenderId: firebaseConfig.messagingSenderId,
	appId: firebaseConfig.appId,
	measurementId: firebaseConfig.measurementId,
});

export const auth = app.auth();
export default app;
