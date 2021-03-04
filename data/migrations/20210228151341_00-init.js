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
          'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbrainstormcursos.com.br%2Fwp-content%2Fuploads%2F2016%2F01%2Fdefault-avatar.jpg&f=1&nofb=1'
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
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fbusiness-seo-vol-1%2F512%2FControl_Computer_Cog_Gear_PC_Monitor_Screen_Management-512.png&f=1&nofb=1'
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
