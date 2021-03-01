exports.seed = function (knex) {
  return knex('roles')
    .insert([
      {
        role: 'renter' // will get id 1
      },
      {
        role: 'owner' // will get id 2
      }
    ])
    .then(() =>
      console.log(
        '\n== Seed data for roles table added. ==\n'
      )
    );
};
