import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyASyWZYpUxUvd-CxSvu7YVY4SN-cb2gzWE",
	authDomain: "ecommerce--clone-555ff.firebaseapp.com",
	projectId: "ecommerce--clone-555ff",
	storageBucket: "ecommerce--clone-555ff.appspot.com",
	messagingSenderId: "1061375297503",
	appId: "1:1061375297503:web:a3d7a40beef88931e5e66a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
