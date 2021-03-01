exports.seed = function (knex) {
  return knex('tech_hardware').insert([
    {
      tech_id: 1,
      name: 'Microphone',
      description:
        'Audio-Technica 2035 cardioid condenser XLR microphone',
      user_id: 1
    },
    {
      tech_id: 2,
      name: 'DSLR Camera',
      description: 'Canon 5d mkIII DSLR camera',
      user_id: 2
    },
    {
      tech_id: 3,
      name: 'Audio Interface',
      description:
        'Focusrite Scarlett Solo USB audio interface',
      user_id: 1
    }
  ]);
};
