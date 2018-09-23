#!/usr/bin/env sh

set -x

# step 1 - clean
git add .
git stash
git fetch origin
git checkout origin/master
git branch -f gh-pages HEAD
git checkout gh-pages

# step 2 - build
yarn build
rm ./build/static/css/*.map
rm ./build/static/js/*.map
cp -r ./build/* ./

# step 3 - commit & push -f
git add .
git commit -m 'Publish gh-pages'
git push origin gh-pages -f
