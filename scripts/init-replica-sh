#!/usr/bin/env bash
set -euo pipefail

echo "Waiting for MongoDB instances to be available (using mongosh ping)..."
for host_port in mongo-replica-1:27017 mongo-replica-2:27017 mongo-replica-3:27017; do
  host=${host_port%%:*}
  port=${host_port##*:}
  echo "Waiting for $host:$port..."
  until mongosh --host ${host}:${port} --eval 'db.adminCommand("ping")' >/dev/null 2>&1; do
    echo "Still waiting for ${host}:${port}..."
    sleep 1
  done
done

echo "All mongod instances are reachable. Initiating replica set from mongo-1..."
cat <<'EOS' > /tmp/rs-init.js
rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'mongo-replica-1:27017' },
    { _id: 1, host: 'mongo-replica-2:27017' },
    { _id: 2, host: 'mongo-replica-3:27017' }
  ]
});
rs.status();

// create a test user (optional)
db = db.getSiblingDB('admin');
try {
  db.createUser({ user: 'test', pwd: 'testpass', roles: [{ role: 'root', db: 'admin' }] });
} catch (e) {
  print('User creation may have failed or user already exists: ' + e);
}
EOS

echo "Running rs.initiate()"
mongosh --host mongo-replica-1:27017 /tmp/rs-init.js || true

echo "Replica set initiation script finished."

sleep 2
echo "Replica set status:"
mongosh --host mongo-replica-1:27017 --eval 'rs.status()'

echo "Init container exiting."
