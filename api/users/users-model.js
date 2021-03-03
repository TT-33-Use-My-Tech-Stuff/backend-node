const db = require('../../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db('users')
    .select('user_id', 'username')
    .orderBy('user_id');
}

function findBy(filter) {
  return db('users as u')
    .select(
      'u.user_id',
      'u.username',
      'u.email',
      'u.password',
      'r.role_id'
    )
    .join('roles as r', 'r.role_id', 'u.role_id')
    .where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user, 'user_id');
  return findById(id);
}

function findById(id) {
  return db('users as u')
    .select('u.user_id', 'u.username', 'u.email')
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

async function update(id, changes) {
  return db('users as u')
    .update(changes)
    .where('u.user_id', id)
    .then(() => {
      return findById(id);
    });
}
