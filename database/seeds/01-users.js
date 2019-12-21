exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          "id": 1,
          "username": "user123",
          "password": "testing123"
      },
      {
          "id": 2,
          "username": "user1234",
          "password": "testing123"
      },
      {
          "id": 3,
          "username": "user123456",
          "password": "testing123"
      }
      ]);
    });
};