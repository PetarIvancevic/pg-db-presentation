const _ = require('lodash')
const db = require('../db')

exports.up = async pgm => {
  await pgm.createTable('books', {
    id: 'id',
    title: {
      type: 'varchar',
    },
    authors: {
      type: 'varchar'
    },
    page_count: {
      type: 'integer'
    }
  })
};

exports.down = async pgm => {
  try {
    (await pgm.dropColumn('user_books', 'book_id'))
  } catch (err) { console.error(err) }
  await pgm.dropTable('books')
};
