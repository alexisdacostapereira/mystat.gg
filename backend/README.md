# BackEnd

## Description

This is the Backend part for the project MyStats

The Backend Use Ruby with his beautiful Framework Ruby On rails :)

RoR works with *gems*, they are like little librairies !

Ruby Version: **ruby 3.0.1**

Rails Version: **Rails 6.1.3.2**
***
## Installation

First you have to install [Ruby](https://www.ruby-lang.org/fr/documentation/installation/), and check the version

```
ruby --version
ruby 3.0.1p64
```

Then, install [Ruby On rails](https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm), and check the version
 
```
rails --version
Rails 6.1.3.2
```
***

## Initialisation

**Don't Forget to enter into the backend directory :)**

First, Install [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

```
yarn install
```

Do the following command to install all required gems
```
bundle install
```

Then Update The Database:

```
rails db:migrate
```

Finally, To Launch the Backend do:

```
npm run server
```

***

## Database

![Imgur](https://i.imgur.com/FsDlpGu.png)

### The Database contains 6 Tables:

***User:*** All Users from our app

***Actualities:*** Actualitie preference for each User

***Stats Connections:*** Keep all stats connections for a user

***Forum:*** Create a Forum Section for each Games

***Messages:*** Each messages, related to a user and a Forum

***Instant Gaming Games:*** Games Scraped From Instant Gaming  

***
## Routes

<!>****Don't Forget To Launch the Backend****<!>

I've Created a Swagger to get all the details ! [Check It Out](http://localhost:3000/api-docs/index.html)