exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('user_id');
      table.string('username', 128).notNullable().unique();
      table.string('password', 256).notNullable();
    })
    .createTable('tech_hardware', (table) => {
      table.increments('tech_id');
      table.string('name', 128).notNullable();

      table.string('description', 256);
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tech_hardware')
    .dropTableIfExists('users');
};
