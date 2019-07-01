
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  
      return knex('hotels').insert([
        {name: "Coco-Havana", locations:"Jamaica, Bahamas, Hawaii", star_rating:  4, 
        discount_code: "forGood2", percent_donated: 15, 
        image_url:'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80' },
        {name: "Paradise Grove", locations:"Venice, Maldives, Thailand", star_rating:  4, 
        discount_code: "Donate44", percent_donated: 15, 
        image_url:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
       
      ]);
  
};
