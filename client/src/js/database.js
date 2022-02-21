import { openDB } from 'idb';
// import { restart } from 'nodemon';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post');

  // what is the second parameter for?
  const jateDb = await openDB('jate', '1');

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ jate: content})

  const result = await request;
  console.log('Data saved to db', result);
  return result;
};

// export const getDb = async (content) => {
//   console.log('Get');

//   const jateDb = await openDB('jate', '1');

//   const tx = jateDb.transaction('jate', 'readonly');

//   const store = tx.objectStore('jate');

//   const request = store.getAll()

//   const result = await request;
//   console.log('Data saved to db', result);
//   return result;
// };

// Get one thing
export const getDb = async (content) => {
  console.log('Get');

  const jateDb = await openDB('jate', '1');

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1)

  const result = await request;
  console.log('Data saved to db', result);
  return result.value;
};


initdb();
