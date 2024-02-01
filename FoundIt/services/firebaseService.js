// firebaseService.js
import db from './firebaseConfig'; // import the Firestore instance from your config file

const addUserData = (userData) => {
  return db.collection('users').add(userData);
};

const getUserData = () => {
  return db.collection('users').get();
};

export { addUserData, getUserData };
