import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({users: [], products: []}).write(); // Set some defaults (required if your JSON file is empty)

export default db;