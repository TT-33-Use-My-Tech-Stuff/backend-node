exports.seed = function (knex) {
  return knex('users').insert([
    {
      user_id: 1,
      username: 'Peter',
      email: 'peter@peter.com',
      password: 'abc123',
      role_id: 2
    },
    {
      user_id: 2,
      username: 'OscFig',
      email: 'oscfig@oscfig.com',
      password: 'abc123',
      role_id: 2
    },
    
  ]);
};
