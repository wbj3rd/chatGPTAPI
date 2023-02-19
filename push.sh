#/bin/bash

tsc
git checkout -b final
git add .
git commit -m "auto commit"
git push --set-upstream origin master -f