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
        .string('ava_img', 512)
        .defaultTo(
          'https://64.media.tumblr.com/84365fe19039b5fd917d6d449ca86290/tumblr_op4lb5DPRe1qg6rkio1_1280.jpg'
        );
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
      table.string('description', 256).notNullable();
      table
        .string('tech_img', 512)
        .defaultTo(
          'https://cdn4.iconfinder.com/data/icons/computer-and-web/80/Computer_and_web_icons-06-512.png'
        );
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
