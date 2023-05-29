cd ~/ubltv-course-project
npm run build:prod

rm -rf ~/../var/www/course-project/html
mv ~/ubltv-course-project/build ~/../var/www/course-project/html