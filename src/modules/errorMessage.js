function displayMessage(wrapper, message){
  if(document.getElementById('squarebook_error')){
    return;
  }

  let div = document.createElement('div');
  div.id = 'squarebook_error'
  div.style.backgroundColor = 'black';
  div.style.width = wrapper.clientWidth + 'px';
  div.style.height = wrapper.clientHeight / 10 + 'px';
  div.style.position = 'absolute';
  div.style.textAlign = 'center';
  div.style.color = 'red';
  let text = document.createTextNode(message);
  div.appendChild(text);

  wrapper.appendChild(div);

  setTimeout(()=>{
    document.getElementById('squarebook_error')
      .parentNode.removeChild(document.getElementById('squarebook_error'));
  }, 3000)
}

export default {
  displayMessage: displayMessage
}
