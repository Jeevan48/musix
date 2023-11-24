HOSTING A PHP WEBSITE WITH MYSQL ON AWS (AWS + Ubuntu Terminal)
//4/11/2023

NOTE: if a line starts with '-', it is a command(excluding '-')

launch ec2 instance
name: musix // your instance name
AMI: ubuntu
key-pair: musix-kp (Downloads) //whatever you want

edit network settings
subnet: ...-1a
security group name: musix-sg //whatever you want
add security groups: http and https (anywhere)
LAUNCH INSTANCE

GOTO rds dashboard
click 'db instance(0/40)'
click 'create instance'
choose mysql
Engine version: latest
template: free tier
db instance identifier: musix-db // your name my is tour-db
username: admin
password: root1234
allocated storage: 20GB
DISABLE autoscaling
public access: yes

vpc security group: 'create new'
vpc security group name: musix-database //your name mine is tour-database
availability zone: us-east-1a
click CREATE DATABASE

goto EC2 instance
select(tick) it and click CONNECT
click connect again at bottom of screen(console will open of ec2)
-sudo -i
-apt update
-apt install apache2
-sudo apt install php libapache2-mod-php php-mysql
-cd /var/www/html/
COPY public IP of EC2 Instance
Open it in browser (You should see apache default page)

//update in your php file , servername(database_endpoint url), username(admin),password(root1234),database
//commit and push update on git before executing below commands
wget zip git url
apt install unzip
unzip main.zip (zip file name may vary )
ls
rm main.zip
mv index.html index.html_bkp //will supress index.html
cd Tours_and_travel-main/ //go to main
mv _ /var/www/html //move all content out to html file. _ for all files
cd ..
ls

GOTO security groups of your database
edit inbound rules of the group
add security group for same (mysql/aurora) and select anywhere(ipv4)
COPY endpoint of your database
-telnet PASTE 3306
(just wait for command to run, it will say connection closed but that's fine)

-apt install mysql-client

Now enter following command
-mysql -u admin -h YourDatabaseEndPoint -p
Enter password
You are now on mysql command line
-show databases;
-create database your_db_name;
-use your_db_name;
-//create the table and it's attributes having reference of your php file
-exit;

//go to your public ip if it is not showing the content then check the links to images and css file as there location is different in your machine and git
