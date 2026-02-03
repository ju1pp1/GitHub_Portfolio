#!/usr/bin/env sh
set -eu

# Wait for app to be ready (tries for ~10s)
for i in $(seq 1 20); do
  if curl -s -o /dev/null http://localhost:8199; then break; fi
  sleep 0.5
done

expected="4" # floor( (1+3+7+8)/4 ) = 4
got=$(
  curl -s -X POST \
    -H 'Content-Type: application/json' -H 'Accept: text/plain' \
    -d '{ "numbers": [1,3,7,8] }' \
    http://localhost:8199
)

echo "Expected: $expected, Got: $got"
[ "$got" = "$expected" ]

echo "OK" > test-report.txt