#!/bin/bash
set -exa

FAIL=0

rm -rf node_modules
rm -rf package-lock.json
ionic cordova platform rm ios
ionic cordova platform rm android
rm -rf plugins/*
npm install
ionic cordova platform add android
ionic cordova platform add ios

for job in `jobs -p`
do
    echo $job
    wait $job || let "FAIL+=1"
done

echo "Building project locally: $FAIL"

if [ "$FAIL" == "0" ];
then
    echo "Build success"
else
    echo "Build failed"
		exit 1
fi
