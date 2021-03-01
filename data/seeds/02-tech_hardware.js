exports.seed = function (knex) {
  return knex('table_name').insert([
    { tech_id: 1, name: 'Microphone', description: 'Audio-Technica 2035 cardioid condenser XLR microphone' },
    { tech_id: 2, name: 'DSLR Camera', description: 'Canon 5d mkIII DSLR camera' },
    { tech_id: 3, name: 'Audio Interface', description: 'Focusrite Scarlett Solo USB audio interface' }
  ]);
};
