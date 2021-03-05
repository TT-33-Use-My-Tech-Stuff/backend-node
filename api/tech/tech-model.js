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
  return db('tech_hardware')
    .select(
      'tech_id',
      'name',
      'description',
      'tech_img',
      'user_id'
    )
    .orderBy('tech_id');
}

function findBy(filter) {
  return db('tech_hardware as t')
    .select(
      't.tech_id',
      't.name',
      't.description',
      't.tech_img'
    )
    .where(filter);
}

async function add(tech) {
  const [id] = await db('tech_hardware').insert(
    tech,
    'tech_id'
  );
  return findById(id);
}

function findById(id) {
  return db('tech_hardware as t')
    .select(
      't.tech_id',
      't.name',
      't.description',
      't.tech_img',
      'u.username',
      'u.user_id'
    )
    .join('users as u', 'u.user_id', 't.user_id')
    .where('t.tech_id', id)
    .first();
}

function remove(id) {
  return db('tech_hardware')
    .where('tech_id', id)
    .del()
    .then(() => {
      return db('tech_hardware');
    });
}

async function update(id, changes) {
  return db('tech_hardware as t')
    .update(changes)
    .where('t.tech_id', id)
    .then(() => {
      return findById(id);
    });
}
