// firebaseService.js
import db from '../constants/firebaseConfig'; // import the Firestore instance from your config file
import { collection, query, where, getDocs} from "firebase/firestore";

const addUserData = (userId) => {
  return db.collection('users').add(userId);
};

const getUserData = async (name) => {
  const users = db.collection("users");
  const specificUser = await users.where("name", "==", name.toLowerCase()).get();
  let user = null;
  specificUser.forEach(doc => {
    user = doc.data();
    user.id = doc.id
  })
  return user;
};

const addPosts = (userId, postData) => {
  return db.collection('users').doc(userId).collection('posts').add(postData);
};


async function getPosts(content) {
  const results = [];
  if (content == ""){
    const defaultSearch = db.collection("posts").get();
    (await defaultSearch).forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      results.push(data);
      return results
    });
  }
  const byName = db.collection("posts").where("name", "==", content.toLowerCase());
  const byTag = db.collection("posts").where("Tag", "==", content);

  const [snapshot1, snapshot2] = await Promise.all([byName.get(), byTag.get()]);

  snapshot1.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    results.push(data);
  });

  snapshot2.forEach(doc => {
    if (!results.some(result => result.id === doc.id)) {
      const data = doc.data();
      data.id = doc.id;
      results.push(data);
    }
  });

  return results;
}

export { addUserData, getUserData , getPosts, addPosts};