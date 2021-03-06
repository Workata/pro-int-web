import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const config = {
  apiKey: "AIzaSyCGMkWMcLZtJMgypTPVUYUmfOtNAw7AxIA",
  authDomain: "rate-app-7577d.firebaseapp.com",
  projectId: "rate-app-7577d",
  storageBucket: "rate-app-7577d.appspot.com",
  messagingSenderId: "613439669437",
  appId: "1:613439669437:web:5b34e74f3b443f89b2a3d4"
};

// firebase.initializeApp(firebaseConfig);

// export default firebase;

class Firebase{
    constructor(){

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }else {
            firebase.app(); // if already initialized, use that one
         }
        // firebase.initializeApp(config);
        
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async signin(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
            return err;
        });
        return logout;
    }

    async getUserState(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    async deleteFilm(filmDocName){
        const deleteFilm  = await firebase.firestore().collection("Films").doc(filmDocName).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    async deleteSeries(filmDocName){
        const deleteSeries = await firebase.firestore().collection("Series").doc(filmDocName).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    async getFilms(user){
        let postsArray = [];
        const posts  = await firebase.firestore().collection("Films").where('uid', '==', user.uid).get();
        posts.forEach(doc => {
            postsArray.push({id:doc.id, data: doc.data()});
        });
        return postsArray;
    }

    async getSeries(user){
        let postsArray = [];
        const posts  = await firebase.firestore().collection("Series").where('uid', '==', user.uid).get();
        posts.forEach(doc => {
            postsArray.push({id:doc.id, data: doc.data()});
        });
        return postsArray;
    }


    async addFilm(user, post) {

        const firestorePost = await firebase.firestore().collection("Films").add({
            uid: user.uid,
            title: post.title,
            rating: post.rating
        }).catch(err => {
            console.log(err);
            return err;
        });
        return firestorePost;
    }

    async addSeries(user, post) {

        const firestorePost = await firebase.firestore().collection("Series").add({
            uid: user.uid,
            title: post.title,
            rating: post.rating
        }).catch(err => {
            console.log(err);
            return err;
        });
        return firestorePost;
    }

}

export default new Firebase();