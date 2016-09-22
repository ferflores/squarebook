var container = document.getElementById('container');

squarebook({
  container:container,
  getDataUrl:'http://localhost:3000/getData',
  postDataUrl: 'http://localhost:3000/postData'
});

/*
squarebook({
  container:container,
  firebaseConfig:{
    apiKey: "AIzaSyDZL2pOHvTJJb8SEartEwhZDe-8XPIb_ME",
    authDomain: "myguestbook-a3cb4.firebaseapp.com",
    databaseURL: "https://myguestbook-a3cb4.firebaseio.com",
    storageBucket: "myguestbook-a3cb4.appspot.com",
    messagingSenderId: "659560428906"
  }
})*/
