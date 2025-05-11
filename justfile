# Justfile for managing common tasks. Write `just <task>` to execute a command.

start:
  just install
  rm -rf .next
  yarn dev

install:
  @echo "Checking install"
  @if [ -f .installed ]; then \
    echo "Install already done, skipping."; \
  else \
    echo "Running yarn install"; \
    yarn install && echo "Creating .installed marker" && touch .installed; \
  fi

clean:
  rm -rf node_modules
  rm -rf .yarn
  rm -rf .next
  rm -f .installed

newdb:
  dropdb "payload-website" || true
  psql -v ON_ERROR_STOP=1 template1 -c 'CREATE DATABASE "payload-website";'
  psql -d "payload-website" -v ON_ERROR_STOP=1 -c 'GRANT ALL ON SCHEMA public TO postgres;'