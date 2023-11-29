const camp1 = document.querySelector('#txt');
const btn = document.querySelector('#btn1');
const part = document.querySelector('#part');
const conf = document.querySelector('.confetti-container');
const guardar = document.querySelector('#guardar');
const card = document.querySelector('.card');

btn.addEventListener('click', btnOnClick)   
guardar.addEventListener('click', cargarParticipantes)   

participantes = []
ganadores1 = []
textoss = []
ganadores = []

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//let res = ""

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);
    node.classList.add('--animate-duration', '.5s');

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

function resultado(){
    let ganador2 = ganadores[getRandomInt(ganadores.length)]
    let res = participantes[getRandomInt(participantes.length)]
    let yaGano = ganadores.includes(res);
    if(ganadores.length >= 9){
      alert("El máximo de ganadores es 9!")
      return
    }
    if (yaGano){
      console.log("Esta persona ya ganó")
      return resultado()
    
    } 
    if (res.length >= 38)
      camp1.style.fontSize  = "1.6em";
    else
      camp1.style.fontSize  = "2em";  

    camp1.innerText = res
    conf.style.visibility = "visible";
    card.style.visibility = "visible";
    animateCSS('#txt', 'heartBeat');
    ganadores.push (res)
    actualizarLista(res)
}

function actualizarLista(item) {
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  const index = ganadores.length;
  td.appendChild(document.createTextNode(index + "°"));
  if (td) {
    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(item));
  }
  document.querySelector("tbody").appendChild(tr).appendChild(td);
  document.querySelector("tbody").appendChild(tr).appendChild(td2);
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function btnOnClick() {
  for (let repeatCount = 0; repeatCount < 3; repeatCount++) {
      if (participantes.length < 10) {
          alert("Debe colocar más de 10 participantes");
          return;
      }

      conf.style.visibility = "hidden";

      for (let i = 0; i < participantes.length; i++) {
          camp1.innerText = participantes[i];
          camp1.style.visibility = 'visible'
          await sleep(10 * 0.5);          
          if (i === participantes.length - 1) {
              resultado();          
          }
      }
  }
  setTimeout(function() {

    participantes.innerText = ''; 
    camp1.style.visibility = 'hidden';
  }, 0);

}


function cargarParticipantes(){
  participantes = []   
  var textoIngresado = document.getElementById('part').value;
      var lines = textoIngresado.split('\n');
      sessionStorage.setItem("participantes", JSON.stringify(lines));
      for(var i = 0;i < lines.length;i++){
          participantes.push(lines[i])
      }
}
