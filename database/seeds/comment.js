exports.seed = function(knex) {
  return knex('comments')
    .truncate()
    .then(function() {
      return knex('comments').insert([
        {
          "comment_id":1,
          "comment":"test123"
          
      },
      {
          "comment_id": 2,
          "comment": "testing1234",
         
      },
      {
          "comment_id": 3,
          "comment": "testing123456",
        
      }
      ]);
    });
};