# Natas Teaches the basics of server side security

## Level 0

From level 0 you get the url and login to the next level.
Usernam: natas0
Password: natas0

## Level 0

The password can be found in the comments of the website
Username: natas1
Password: gtVrDuiDfck831PqWsLEZy5gyDz1clto

## Level 1

The password for level 2 is also in the comments of the website.
Username: natas2
Password: ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi

# Level 2

The third level shows how passwords can be exposed when we don't have appropriate permissions in the web server like no file indexing. To get the password for this level we have to look into the file directory in which the pixel image exists. Here the server should have done.

```
<Directory /s3cr3t/>
  Options -Index
  AllowOverride None
  Require all denied
</Directory>
```

Username: natas3
Password: sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14

# Level 3

The hint for this level is in the line even google can not find it. The robots.txt file contains the routes that crawlers should not access. But the route is not protected and open to access for everyone.
Username: natas4
Password: Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ

# Level 4

For this challenge the page says that the get requests to this page should come from natas5. This referer can be specified in the http headers of a request. It means the page from which the request is comming from.
Username: natas5
Password: iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq

# Level 5

In this level the main point is that your cookies on the server should not be guessable by the users. In this particular example the loggedin cookies was set to 0 which can be conveniently set to 1 to bypass the server security.
Username: natas6
Password: aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1

# Level 6

In level 6 the include files were exposed maybe because they had a diffrent extension. The include files have different extensions because the php files are to be served by the server whereas the inc files are supposed to be used internally only. In our case the inc files were also exposed which leaked the salt used for authorization.
Username: natas7
Password: 7z3hEENjQtflzgnT29q7wAvMNfZdh0i9

# Level 7

This is by far the most intersting level. The attack in this example is called 'local file inclusion'. In this case there are two files `home` and `about` which the index.php file is reading and showing the content on the webpage. This vulnerability can be exploited to access any file on the system. We use this to read the password file for next level.
Username: natas8
Password: DBfUBfqQG69KvJvJ1iAbMoIpwSNQ9bWe

# Level 8

This level is quite similar to level 6. It contains some cryptography for which I have created helper functions.
Username: natas9
Password: W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl

# Level 9

This level shows the php remote code execution method. Here the php's `passthru` function just executes the code that is passed to it. In this example we are passing are meant to pass arguments to `grep` command but since the input is not sanitized we can pass anything i.e new flags with grep to scan the password directory and give us the password to the next level. This is very dangerous since we can use `&`, `;` or `|` to end the grep command and execute anything else we want on the server.
Username: natas10
Password: nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu

# Level 10

This level builds upon the previous level and filters out `&` and `;` to reduce us to only grep command. We can comment out the rest of the line by putting a `#` at the end of the command.
Username: natas11
Password: U82q5TCMMQ9xuFoI3dYX61s7OZD9JKoK

# Level 11

This level is also an example of insecure cookies as level 5. The cookies in this case is a json string that is first xor_encrypted and then base64 encoded. The xor_encrypt algorithm is not secure because

```
data ^ key = cypherText
data ^ cypherText = key
```

Because we have the data from the source code and cypherText from the cookie it is easy to find the key. The key is circular because it is modules by its length. We can find the key and create a new cookie with our custom values and make a request with it to authorize.
Username: natas12
Password: EDXp0pS26wLKHZy1rDBPUZk0RKfLGIR3

# Level 12

Level 12 is a very intersting level as it shows how not checking for the file correctly can lead to php reverse shell attacks. Here in this example instead of uploading a genuine jpg image as the code expects we upload a malicious php file that run any query we send it as argument. By doing so we can run the cat command and get the password of the next level.
Username: natas13
Password: jmLTY0qiPZBbaKc9341cqPQZBJv7MQbY
