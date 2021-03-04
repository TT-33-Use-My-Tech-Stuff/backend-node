exports.seed = function (knex) {
  return knex('tech_hardware').insert([
    {
      tech_id: 1,
      name: 'Microphone',
      description:
        'Audio-Technica 2035 cardioid condenser XLR microphone',
      tech_img: 'tech_img_url',
      user_id: 1
    },
    {
      tech_id: 2,
      name: 'DSLR Camera',
      description: 'Canon 5d mkIII DSLR camera',
      tech_img: 'tech_img_url',
      user_id: 2
    },
    {
      tech_id: 3,
      name: 'Audio Interface',
      description:
        'Focusrite Scarlett Solo USB audio interface',
      tech_img: 'tech_img_url',
      user_id: 1
    }
  ]);
};
