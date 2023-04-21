set -e

npm run build

cd dist

git init
git add -A
git commit -m 'new deploy'
git push -f git@github.com:Feenny/banki.shop.git main:gh-pages

cd-