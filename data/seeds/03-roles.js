exports.seed = function (knex) {
  const roles = [
    {
      name: 'renter' // will get id 1
    },
    {
      name: 'rentee' // will get id 2
    }
  ];

  return knex('roles')
    .insert(roles)
    .then(() =>
      console.log(
        '\n== Seed data for roles table added. ==\n'
      )
    );
};
