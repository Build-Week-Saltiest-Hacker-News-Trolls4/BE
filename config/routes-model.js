const db = require("../database/dbconfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById
  };

  function find() {
    return db("users").select("id", "username");
  }

  function find() {

    return db("top_20_users")

  }
  
  function findBy(filter) {
    return db("users").where(filter);
  }

  async function add(user) {
    const [id] = await db("users").insert(user, "id");
    console.log(id)

    return findById(id);
  }
  async function add(comment) {
    const [id] = await db("comments").insert(comment, "id");
    console.log(id)

    
  }

  function findById(id) {
    return db("users")
      .select("id", "username")
      .where({ id })
      .first();
  }