exports.up = pgm =>
  pgm.createTable('users', {
    // primary key
    id: 'id',
    email: {
      type: 'varchar',
      unique: true,
      notNull: true,
    }
  })

exports.down = pgm => pgm.dropTable('users')