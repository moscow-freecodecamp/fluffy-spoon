# fluffy-spoon
It's just like Tinder, but for programmers 

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-generate-toc again -->
**Table of Contents**

- [fluffy-spoon](#fluffy-spoon)
- [To start](#to-start)
- [README from vuejs-boilerplate](#readme-from-vuejs-boilerplate)
    - [Status Update from Owner](#status-update-from-owner)
        - [-](#-)
    - [Build Setup](#build-setup)
        - [Client side](#client-side)
        - [Server side](#server-side)
    - [CHANGE LOG](#change-log)
        - [0.5](#05)
        - [0.3](#03)
        - [0.2](#02)
        - [0.1](#01)
    - [TODO LIST](#todo-list)

<!-- markdown-toc end -->

# Prerequisites

* Have a recent version of [PostgreSQL](https://www.postgresql.org/) installed
* Expose the connection parameters via environment variable [DATABASE_URL](https://devcenter.heroku.com/changelog-items/438)

At this moment we are using gmail to send email on registration. To try this feature you need to provide some valid gmail credentials via environment variables `email` and `password`:

```bash
export email=fluff@gmail.com
export password=my_precious
```

# To start

If you're using yarn:
```bash
cd fluffy-spoon/client
yarn
yarn run dev

cd fluffy-spoon/server
yarn
yarn run start
```

If you're using npm:
```bash
cd fluffy-spoon/client
npm install
npm run dev

cd fluffy-spoon/server
npm install
npm run start
```

If you have [docker](https://www.docker.com/) and [docker](https://docs.docker.com/compose/) installed:

```bash
export GMAIL_ADDRESS=fluff@gmail.com
export GMAIL_PASSWORD=my_precious
docker-compose up # try "docker-compose up -d" to start a background process
```

Then open http://localhost:8080/

# README from vuejs-boilerplate

Copied from https://github.com/patrickbolle/vuejs-boilerplate

## Status Update from Owner

Hi all, just wanted to chime in here as I've obviously been quite inactive hah...
I'm currently on vacation and will be back to full working force around June 7th (one week from now).

My status update:

I essentially forked this project and created a 'new' boilerplate for myself (currently private on gitlab) as I'm hoping to launch a few MVPs with it.

It still uses this boilerplate as a basis, but I've added a few things and improved a lot:

Sparkpost email integration
Authentication/roles fully complete using JWT
Fully deployed (after many hours of struggle!)
Various improvements to everything like UI, server code, etc

Here you can see the working prototype... I'm hoping to launch this in the next few weeks, if you guys want to go through and try and break things, please give it a shot!

www.travelcurated.com

So essentially, when this travel curated site is MVP ready (soon) I will be cloning it, stripping it of all travel related specifics, rebranding it as the vue-boilerplate, and then I will release it into the wild in this repo (or another one, we will see).

That will put this repo as an almost 100% ready to clone boilerplate where you guys can clone it and launch a site quickly (which was my original purpose with this project).

---


#### A Vue.js Boilerplate Project
Includes
- Vue.js 2.0
- Express
- Passport
- Postgres


## Build Setup

### Client side

``` bash
# move to client directory
cd client

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### Server side

Load PostgreSQL database with `create_tables.sql` file in 'server/sql'.

``` bash
# move to server directory
cd server

# install dependencies
npm install

# run the server
DATABASE_URL='postgres://postgres@localhost:5432/todo' \
email='myemail@gmail.com' \
password='mypassword' \
PORT=3000 \
npm start
```

## CHANGE LOG
### 0.5
- Switched to Postgres as database
- Removed Vue-Auth - will be building my own solution for it.
- Login + Register works, CRUD works for Todo List items.

### 0.3
- Refactored all code to Vue JS 2.0 (with updated vue-webpack template)
- Switched from Bulma CSS library to Bootstrap 4.0 Alpha (looks great now)
- Login no longer works but register + listing of users works perfectly.

### 0.2
- Vue-Auth working properly now, shows user data with $auth.user().email, etc.
- Register/Login/Logout works, needs more error checking though

### 0.1
- Vue-auth + Passport JS working together for Authentication
- RethinkDB connected and hosts the user accounts
- Bulma.io CSS library for UI

## TODO LIST
- Basic CRUD
- More advanced user system (roles + forgot password)
- Deploy to a demo server for people to try out + test
- Better error handling (almost none now)
