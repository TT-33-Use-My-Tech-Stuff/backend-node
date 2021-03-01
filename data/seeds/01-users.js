exports.seed = function (knex) {
  return knex('users').insert([
    { user_id: 1, username: 'Peter', password: 'abc123' },
    { user_id: 2, username: 'OscFig', password: 'abc123' },
    {
      user_id: 3,
      username: 'xXx_3lite_Snipes_xXx',
      password: 'abc123'
    }
  ]);
};
