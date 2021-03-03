exports.up = function (knex) {
  return knex.schema
    .createTable('roles', (table) => {
      table.increments('role_id');
      table.string('role', 64).notNullable();
    })
    .createTable('users', (table) => {
      table.increments('user_id');
      table.string('username', 128).notNullable().unique();
      table.string('email', 128).notNullable().unique();
      table.string('password', 256).notNullable();
      table
        .integer('role_id')
        .unsigned()
        .references('role_id')
        .inTable('roles')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .defaultTo(1);
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
        .onDelete('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tech_hardware')
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
};
