--Get the LIKE email query
SELECT *
FROM pg_stat_statements
WHERE query = 'SELECT * FROM users WHERE email LIKE $1';

-- invidivual fields
SELECT query, calls, max_exec_time, min_exec_time
FROM pg_stat_statements
WHERE query = 'SELECT * FROM users WHERE email LIKE $1';

-- create index
CREATE INDEX ON user_books (book_title);

-- book title exact
SELECT query, calls, max_exec_time, min_exec_time, mean_exec_time, mean_plan_time
FROM pg_stat_statements
WHERE query = 'SELECT * FROM user_books WHERE book_title = $1';