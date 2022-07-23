# PG-DB-Presentation

Small repository to play around with postgres monitoring functions.

### Setup steps

1. Build the db docker image or use the public postgres image. The local Dockerfile has pg_stat_monitor extension setup if you want to try that out.
```bash
  docker build -t presentation-db .
```

2. Run the built docker image
```bash
  docker run -p 5001:5432 --name presentation-db-helper -e POSTGRES_PASSWORD=pass123 -d --rm presentation-db
```

*Note* If you want to use the pg_stat_monitor you will have to run the pgStatMonitor.js script to install the extension and then restart the db container. [More info here:](https://github.com/percona/pg_stat_monitor)