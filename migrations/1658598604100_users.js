exports.up = pgm =>
  pgm.createTable('users', {
    // primary key
    id: 'id',
    email: {
      type: 'varchar',
      notNull: true,
    }
  })

exports.down = pgm => pgm.dropTable('users')