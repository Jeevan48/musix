HOSTING A PHP WEBSITE WITH MYSQL ON AWS (AWS + Ubuntu Terminal)
//4/11/2023

YouTube Link: https://youtu.be/Ev3--3aX2X0?si=dLYiux_2iXB_E4Q5

NOTE: if a line starts with '-', it is a command(excluding '-')

launch ec2 instance
name: musix-instance
AMI: ubuntu
key-pair: musix-kp (Downloads)

edit network settings
subnet: ...-1a
security group name: musix-sg
add security groups: http and https (anywhere)
LAUNCH INSTANCE

GOTO rds dashboard
click 'db instance(0/40)'
click 'create instance'
choose mysql
Engine version: latest
template: free tier
db instance identifier: musix-db
username: admin
password: root1234
allocated storage: 20GB
DISABLE autoscaling
public access: yes

vpc security group: 'create new'
vpc security group name: musix-database
availability zone: us-east-1a
click CREATE DATABASE

goto EC2 instance
select(tick) it and click CONNECT
click SSH Client
copy command at bottom

ON Ubuntu Terminal
-cd Downloads
-chmod 400 musix-kp.pem
paste command and ENTER

-sudo -i
-apt update
-apt install apache2
-sudo apt install php libapache2-mod-php php-mysql
-cd /var/www/html/
COPY public IP of EC2 Instance
Open it in browser (You should see apache default page)

-vi index.php
-mv index.html index.html_bkp

now add content in index.php use vi index.php command then press i to go in insert mode, then add your code, press ESC and type :wq (to save and exit editor) or :q! (to exit without saving)

GOTO security groups of your database
edit inbound rules of the group
add security group for same (mysql/aurora) and select anywhere(ipv4)
COPY endpoint of your database
-telnet PASTE 3306
(just wait for command to run, it will say connection closed but that's fine)

-apt install mysql-client
-vi db.inc.php

Add the following code:

<?php

define('DB_SERVER','YourDatabaseEndpoint');
define('DB_USERNAME','admin');
define('DB_PASSWORD','root1234');
define('DB_DATABASE','WhateverDatabaseNameYouWant');

?>

Now enter following command
-mysql -u admin -h YourDatabaseEndPoint -p
Enter password
You are now on mysql command line
-show databases;
-create database your_db_name;
-exit;

Goto https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateWebServer.html
and COPY code of sample.php

-vi sample.php
In this, PASTE and edit all necessary things, starting with include 'dp.inc.php', database name, etc...

$\_SERVER['SCRIPT_NAME']

And that's almost it! You'll have to do some customizations as per your project...
