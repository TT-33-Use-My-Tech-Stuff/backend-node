exports.seed = function (knex) {
  return knex('users').insert([
    { user_id: 1, username: 'Peter' },
    { user_id: 2, username: 'OscFig' },
    { user_id: 3, username: 'xXx_3lite_Snipes_xXx' }
  ]);
};
