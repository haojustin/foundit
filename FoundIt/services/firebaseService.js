// firebaseService.js
import db from '../constants/firebaseConfig'; // import the Firestore instance from your config file

const addUserData = (userId) => {
  return db.collection('users').add(userId);
};

const getUserData = () => {
  return db.collection('users').get();
};

const addPosts = (userId, postData) => {
  return db.collection('users').doc(userId).collection('posts').add(postData);
};

const getPosts = (userId) => {
  if (userId == '')
  {
    return db.collection('posts').get();
  }
  else
  {
    return db.collection('users').doc(userId).collection('posts').get();
  }
};


export { addUserData, getUserData , getPosts, addPosts};
