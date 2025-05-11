# Justfile for managing common tasks. Write `just <task>` to execute a command.

start:
  yarn dev

install:
  yarn install

clean:
  rm -rf node_modules
  rm -rf .yarn
  rm -rf .next

newdb:
  dropdb "payload-website" || true
  psql -v ON_ERROR_STOP=1 template1 -c 'CREATE DATABASE "payload-website";'
  psql -d "payload-website" -v ON_ERROR_STOP=1 -c 'GRANT ALL ON SCHEMA public TO postgres;'