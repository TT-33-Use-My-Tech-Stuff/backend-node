const db = require('../../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function find() {
  return db('users')
    .select('user_id', 'username')
    .orderBy('user_id');
}

function findBy(filter) {
  return db('users as u')
    .select('u.user_id', 'u.username', 'u.password')
    .where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user, 'user_id');
  return findById(id);
}

function findById(id) {
  return db('users as u')
    .select('u.user_id', 'u.username')
    .where('u.user_id', id)
    .first();
}

function remove(id) {
  return db('users as u')
    .where('u.user_id', id)
    .del()
    .then(() => {
      return db('users');
    });
}
