#!/bin/bash
set -exa

FAIL=0

# clone oneserve formio fork repository
rm -fr formiojs-fork
git clone https://github.com/oneserve/formio.js formiojs-fork
cd ./formiojs-fork
# build 
npm install && npm run transpile && npm rebuild node-sass && npm run templates

cd ..

# post build cleanup
rm -fr formiojs-fork/node_modules
# move build to mobile node_modules folder
rm -fr ./node_modules/formiojs
mv ./formiojs-fork/lib ./node_modules/formiojs
# remove fork repository
rm -fr formiojs-fork

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
