// firebaseService.js
import db from '../constants/firebaseConfig'; // import the Firestore instance from your config file

const addUserData = (userId) => {
  return db.collection('users').add(userId);
};

const getUserData = () => {
  return db.collection('users').get();
};

/*
const addPosts = (userId, postData) => {
  return db.collection('users').doc(userId).collection('posts').add(postData);
};
*/
//i(Victor)dk what the deal with userId is so I'm getting rid of it for now
const addPosts = (postData) => {
  return db.collection('posts').add(postData);
};

const getPosts = (name) => {
  const postsRef = db.collection('posts');
  return postsRef.where('name', '==', name).get()
    .then(snapshot => {
      if (snapshot.empty) {
        return postsRef.get();
      }
      return snapshot; // Return the array of posts
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
      throw error;
    });
};


export { addUserData, getUserData , getPosts, addPosts};
