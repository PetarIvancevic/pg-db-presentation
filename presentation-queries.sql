-- enable plan time
ALTER SYSTEM SET pg_stat_statements.track_planning = true;

--Get the LIKE email query
SELECT *
FROM pg_stat_statements
WHERE query = 'SELECT * FROM users WHERE email LIKE $1';

-- index
CREATE INDEX ON users (email);
CREATE INDEX ON users (email varchar_pattern_ops);

-- invidivual fields
SELECT query, calls, max_exec_time, min_exec_time, mean_exec_time, mean_plan_time, plans
FROM pg_stat_statements
WHERE query = 'SELECT * FROM users WHERE email LIKE $1';

-- create index
CREATE INDEX ON user_books (book_title);

-- book title exact
SELECT query, calls, max_exec_time, min_exec_time, mean_exec_time, mean_plan_time, plans
FROM pg_stat_statements
WHERE query = 'SELECT * FROM user_books WHERE book_title = $1';

-- normalized
SELECT query, calls, max_exec_time, min_exec_time, mean_exec_time, mean_plan_time, plans
FROM pg_stat_statements
WHERE query ILIKE '%FROM user_books%';

-- get all user statements
SELECT query, calls, max_exec_time, min_exec_time, mean_exec_time, mean_plan_time, plans
FROM pg_stat_statements
WHERE query ILIKE '%FROM user%';