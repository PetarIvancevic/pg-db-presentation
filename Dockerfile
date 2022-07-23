FROM postgres:14

# percona-release setup
RUN apt-get update
RUN apt install curl -y
RUN curl -O https://repo.percona.com/apt/percona-release_latest.generic_all.deb
RUN apt install gnupg2 lsb-release ./percona-release_latest.generic_all.deb -y
RUN apt update

# pg-stat-monitor setup
RUN percona-release setup ppg14
RUN apt-get install percona-pg-stat-monitor14

EXPOSE 5432