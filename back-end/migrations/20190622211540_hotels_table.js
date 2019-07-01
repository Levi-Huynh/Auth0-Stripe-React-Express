
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('hotels', tbl => {
      tbl.increments();

      tbl
        .string('name', 200)
        .notNullable()
        .unique();

        tbl
        .text('locations')
        .notNullable()

       tbl 
       .float('star-rating')
       .notNullable()

       tbl
       .string('discount-code')
       .notNullable()

       tbl
       .float('percent-donated')
       .notNullable()

       tbl
       .string('image-url')
       .notNullable()


    })

   
}; 


exports.down = function(knex, Promise) {
    return knex.schema
      .dropTableIfExists('hotels')
};
