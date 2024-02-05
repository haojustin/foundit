// firebaseService.js
import db from '../constants/firebaseConfig'; // import the Firestore instance from your config file

const addUserData = (userId) => {
  return db.collection('users').add(userId);
};

const getUserData = () => {
  return db.collection('users').get();
};

const addPostForUser = (userId, postData) => {
  return db.collection('users').doc(userId).collection('posts').add(postData);
};

const getPostsForUser = (userId) => {
  return db.collection('users').doc(userId).collection('posts').get();
};


export { addUserData, getUserData , getPostsForUser, db};
