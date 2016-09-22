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
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
  }
})*/
