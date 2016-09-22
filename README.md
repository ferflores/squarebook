[![npm version](https://img.shields.io/npm/v/squarebook.svg?style=flat-square)](https://www.npmjs.com/package/squarebook)

# squarebook

This is a drawing guestbook, visitors of your site can leave you a drawing.

```
npm install squarebook --save
```

Squarebook can be imported as node package, example:

```
import squarebook from 'squarebook';

squarebook({
  container: document.getElementById('container'),
  getDataUrl:'http://localhost:3000/getData',
  postDataUrl: 'http://localhost:3000/postData'
})

```

The configuration requires a getDataUrl and postDataUrl, an example of server side can be found at example/ directory.

Try the example by cloning this repository then:

```
npm install
cd example/server
npm install
node index.js
```
And open example/index.html in your browser

It looks like this:

![preview image](doc/preview.jpg)

Squarebook has also integration with firebase:

```
squarebook({
  container:container,
  firebaseConfig:{
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
  }
})
```
It saves and loads data from your firebase project on /posts/.

The firebase DB is structured like this:

```
{
  "posts" : {
    "post0" : {
      "name" : "John Doe",
      "points" : {
        "p0" : {
          "color" : "rgb(255, 0, 255)",
          "index" : 217
        },
        "p1" : {
          "color" : "rgb(255, 0, 255)",
          "index" : 248
        }
      },
      "timestamp" : 1474550661088
    },
    "post1" : {
      "name" : "Fer",
      "points" : {
        "p0" : {
          "color" : "rgb(0, 255, 0)",
          "index" : 108
        },
        "p1" : {
          "color" : "rgb(0, 255, 0)",
          "index" : 109
        }
      },
      "timestamp" : 1474551206518
    }
  }
}
```

The database rules are on your own.
