

---3---
select orders.orderId, customers.customerName, customers.city, orders.employeeId, orders.orderDate, employees.FirstName, employees.LastName
from orders
inner join customers on orders.customerId = customers.customerId
inner join employees on orders.employeeID = employees.employeeID


#sql lite: 
-double pipe to contecanate strings 
(employees.firstName || ' ' || employees.lastName) as Employee

another way to write:

#inner
select * from customers as c 
inner join orders as o on c.customerId = o.customerId

#left
select * from customers as c 
left join orders as o on c.customerId = o.customerId

#return customerID that has no orders
select * from customers as c
left join orders as o on c.customerId = o.customerId
where o.orderId is null

#return customerID that have  orders
select * from customers as c
left join orders as o on c.customerId = o.customerId
where o.orderId is null

#select customer name
select distinct from customers as c
left join orders as o on c.customerId = o.customerId
where o.orderId is null

#aggregations, no of items per order (orderId, 5)
select o.orderId, count(od.orderId) as ItemsCount
from orders as o
inner join orderdetails as od on o.orderId = od.orderId


#aggregations, no of items grouped by order 
select o.orderId, o.orderDate,  count(od.orderId) as ItemsCount
from orders as o
inner join orderdetails as od on o.orderId = od.orderId
group by o.orderId, O.orderDate

or

select o.orderId, count(od.orderId) as ItemsCount
from orders as o
inner join orderdetails as od on o.orderId = od.orderId
group by o.orderId


#revenue per order (quantity * price)
select o.orderId, round(sum(od.quantity * p.price), 2) as Revenue
from orders as o
inner join orderdetails as od on o.orderId = od.orderId
inner join products as p on od.productId = p.productId
group by o.orderId 
order by Revenue desc

or

select o.orderId, round(total(od.quantity * p.price), 2) as Revenue
from orders as o
inner join orderdetails as od on o.orderId = od.orderId
inner join products as p on od.productId = p.productId
group by o.orderId 
order by Revenue desc

#ignore first few records (2 offset )
select * from customers
order by customerName //optional but highly recommended order by 
limit 5 //per page --take
offset 2 // ignore this many records or offset 0 (first page)

paginate on db level

query string pass limit on offset, then API takes that amd kes the query to the db passing the offset, and DB only returns whats in query string

Review

-joins (inner and left)
-table aliases
-aggregate functions and grouping
-pagination
-concatenation
-is null (is not null)

schema

-structure of ....
-databse
-table
(tables, attributes, columns, types of data, attributes of column)
schema at db level and table level

create tables
add columns to tables


Try JS to create roles table & create data
Source control for db 
history of all changes for db
different version history of tables
need way to keep code of db and db insync

migrations:
a way to recreate your db to particular point in time

changes that goes to structure of db (add table, modify columns STRUCTURE)  create migration


# #migrations
-delete rolex.db3 original
(`npx knex` reminds us of commands we have option)
-run `npx knex init` to generate a '.knexfile.js'
-modify `knexfile.js` to configure our db connections
-remove staging and production configurations from  `knexfile.js`
-make a migration for each db schema change
`npx knex migrate:make create_roles_table`
-npx knex migrate:latest 


# #migrations
-delete rolex.db3 original
(`npx knex` reminds us of commands we have option)
-run `npx knex init` to generate a '.knexfile.js'
-modify `knexfile.js` to configure our db connections
-remove staging and production configurations from  `knexfile.js`
-make a migration for each db schema change
`npx knex migrate:make create_roles_table`
-npx knex migrate:latest 

==if want to roll back by 1 migration:
`npx knex migrate:rollback`

magic if someone coming in with no db then migrate:latest and gets
the right version of the DB


//if commit & push// they can use that commit history to use db exactly as was
//b/c you have your history in Javascript & pushed (until the next migration)

-`npx knex migrate:latest` runs all migrations that have not yet been run: (ALL NEW
MIGRATIONS-- MAKE SURE ITS THE LATEST NEWEST MIGRATION)

#foregin key:

 tbl
        .integer('roles_id') //any unique name
        .unsigned() //
        .references('id') //column (name after whatever column is)
        .inTable('roles') //table (whatever table name is)
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

        tbl.timestamps(true, true); //created_at and updated_at


        ^DONT CHANGE TABLE AFTER YOU ALREADY PUSHED THE MIGRATION
        THIS CHANGES THE SYNC!!!
#SEED MAKE

`npx knex seed:make 001-roles` #shows you order

#SEED RUN
Goes to that seed folders and runs in order all the files there

-go into 001-roles
-change 'table created' to 'roles' (name of your table)
-erase del method & replace with
truncate()
-name your columns what you would you 
used for your column, can erase
ID if need be
-save
-`npx knex seed:run`
//if commit & push// they can use that commit history to use db exactly as was
//b/c you have your history in Javascript & pushed (until the next migration)

-npx knex migrate:latest runs all migrations that have not yet been run: (ALL NEW
MIGRATIONS-- MAKE SURE ITS THE LATEST NEWEST MIGRATION)

---4---
One to many relationships.
Many to many relationships.
One to one relationships.
Normalizing the model.

add relationships between tables
explain data normalization and normal forms

#STEPS
Requirements
Data Model
^From That Create DB Schema

-Will write migrations & Seeding scripts,
write data access file that exports an object with following functions:

getDishes(): should return a list of all dishes in the database.
addDish(dish): should add the dish to the database and return the id of the new dish.
getDish(id): should return the dish with the provided id and include a list of the related recipes.
getRecipes(): should return a list of all recipes in the database including the dish they belong to.
addRecipe(recipe): should add a recipe to the database and return the id of the new recipe.

-design data model
-write next migrations and seeding
-5 data functions in javascript models 

#keep data modeling simple = success (pen & paper & ears is best)

## A GOOD DATA MODEL

-Captures all the data the system needs
-captures only the data the system needs
-(changing datas is not difficult due to migrations, so keep it current with just what you need now)/ Reflects Reality
-is flexible, can evolve with the sytem
-guarantee data integrity
-is driven by the way the data will be used  (end user may not care about how data is modeled)


##Components

-entities  === resources ->  tables
-attributes -> columns 
-relationships === sub-routes (/recipies/:id/ingredients) -> Foreign Keys 


## Worflow

-identify entities -> squares on paper
-identify attributes -> bulleted lists
-identify relationships === sub-routes (/recipes/:id/ingredients) -> Foreign Keys

### Tracks
-id, pk, integer, auto-increment
-name, string(128), unique, required

## Relationships
-one to one -> one to zero or one
-one to many <- most common one
-many to many (smoke , mirrors an illusion) <-a third table

## Mantras

-For a many to many we need: a third table
-The most important tools for data modeling: ears and pen and paper
-one to many relationships translate to: FK
-where does the FK go?  : on the many side

#can use pen & paper or dbdesigner.net


1) 3 squares rep each entity: 
1) Tracks
2) Cohorts
3) Student

2) Concentrate on 2 tables at a time (EX concentrate on tracks and cohorts first)

3) Create the pk of Tracks and Cohort 
    -call the name of the id = "track_id" (if 1st entity table is named track), & choose ID type as same as 1st entity 
    -*For this example, since track has many cohorts, PK will go onto cohorts
    -Note referenced ID of 2nd enitity must be same type as ID of 1st entity you're referencing (integer if 1st entity is integer)
    -When referencing another tables ID don't choose autoincrement
    -for webdesigner.net click foreign key,, & choose Ref Table and Ref. Field
    -

4) Focus on 3rd Table- Studnts 
    -Create PK for Students, with same id type as entity 2(Cohorts)
    -Table name is cohort_id, 
    id Type is integer, 
    choose foreign Key, 
    Ref. Table : cohorts
    Ref. Field: id,
     Do not increment

5) EVen with 500 Entities- Only focus on 2 entities at at time & designing Entity on the many side (many cohorts in 1 track (cohort is many in relationship to track. references track_id), many students in 1 cohort (students is many in relationship to cohort & references cohort_id) )


#Read About Normalizaiton -Like Cummulative guidelines
#If follow workflow above, Models normalized by 3rd Normal Form- Normalized enough for most systems
1 builds on top of another, By 3rd normal form, must have 1st and 2 normal form applied
Everything happens to be 1-many relationship

System requirements will evolve, students can have more than one cohort, as well as cohort more than one student
(-many to many relationship) => 3rd Table

# Working with 3rd Table 
-Focus on 2 tables at a time 
-In Example:
-Create cohort_students table
-focus on cohorts & cohorts_students
-Whats the relationship between those ^ 2 tables at a time

-1 to Many relationship between cohorts & cohorts_students:
    -Create pirmary key for db.desginer net
    -create Fk for cohorts_students: 
        -name: cohort_id
        type: integer
        Ref.Table: cohorts
        Ref.Field: id

## 3rd Table Ex: cohort_students many to many with cohorts table and students table 
       -  belongs to many cohorts
        -has many students

-Cohort_students table is (many) to (1) with students table so Cohort_students has a (student_id) integer foreign key that references the stdeunts table and ref.field:id.

#^ Cohort_students table is a many to many relationship ( or IE a many to 1 relationship to cohorts, as well as to students)

## Modle Slack
## 3rd Table: user_channels
- a user can be in several channels
-a channel can have several users

#in Guided example, the tracks table needs to be created before the cohorts table,
b/c theres a foreign key in cohorts table that is doing reference to tracks table
-chained createTable

##When someone deletes a feild on primary table, that is being referenced with FK on another table ...?
-Restrict
-Cascade
    -Normally on Delete you want to Restrict Changes from  cascading down to other entities
    -When using FK add onDelete ('Restrict'); , onUpdate('CASCADE');, make notNullable(); , 
    -If ok to delete cascading (use cascade), restrict is don't cascacde the deletions to other fields
    -Deleting or .dropTableIfExists() needs to happen in rearest order: Example:

    .dropTableIfExists('cohort_students')
     .dropTableIfExists('students')
 .dropTableIfExists('cohort')
  .dropTableIfExists('tracks');

  #have as many migration files as you need

  #migration lets you pull db of specific version

  

  #mantra: 'for many to many: use third table',
#eitherMantra: 'one to many: use foreign key',
#yetAnotherMantra: 'where does the FK go..the many side'









