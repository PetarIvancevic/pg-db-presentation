

exports.up = pgm => pgm.createTable('user_books', {
  // primary key
  id: 'id',
  user_id: {
    references: 'users',
    type: 'integer',
    notNull: true,
  },
  book_title: {
    type: 'varchar',
  },
  book_authors: {
    type: 'varchar',
  },
  page_count: {
    type: 'smallint',
  },
  review: {
    type: 'smallint',
  }
})

exports.down = pgm => pgm.dropTable('user_books')
