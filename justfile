# Justfile for managing common tasks. Write `just <task>` to execute a command.

install:
  yarn install

clean:
  rm -rf node_modules
  rm -rf .yarn
  rm -rf .next