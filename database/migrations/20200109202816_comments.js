exports.up = function(knex) {
    return knex.schema.createTable('comments', comment => {
      comment.increments();
  
      comment.integer('comment_id', 255);

      comment
        .string('comment',255).unsigned().notNullable().references("id").inTable('users');
     
      
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
  };
  