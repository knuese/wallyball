#!bin/bash

if [[ $* == __tests__* ]]; then
  test=$*
  src=$(echo "$test" | sed 's/__tests__/src/;s/\.test//')
else
  echo 'please specify a path starting with "__tests__"'
  exit 1
fi

npm run prettierOne -- "$test"

npx jest "$test" --collectCoverageFrom="$src"
