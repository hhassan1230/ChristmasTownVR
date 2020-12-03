// https://codepen.io/hhassan1230/pen/oNXMRXx

const items = document.querySelectorAll('.slider-item');
const itemCount = items.length;
const nextItem = document.querySelector('.next');
const previousItem = document.querySelector('.previous');
const navItem = document.querySelector('a.toggle-nav');
let count = 0;

function showNextItem() {
  items[count].classList.remove('active');

  if(count < itemCount - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active');
  console.log(count);
}

function showPreviousItem() {
  items[count].classList.remove('active');

  if(count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }

  items[count].classList.add('active');
  // Check if working...
  console.log(count);
}

function toggleNavigation(){
  this.nextElementSibling.classList.toggle('active');
}

function keyPress(e) {
  e = e || window.event;
  
  if (e.keyCode == '37') {
    showPreviousItem();
  } else if (e.keyCode == '39') {
    showNextItem();
  }
}

nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);
document.addEventListener('keydown', keyPress);
navItem.addEventListener('click', toggleNavigation);

// var spector = new SPECTOR.Spector();
// spector.displayUI();
// <a href="#" class="button-grow" onClick="enterApp();"><img src=./static_assets/Splash/PLAY.png> </a> <!-- <button type="button" class="btn btn-dark" onClick="enterApp();">Enter</button>

// Initialize the React 360 application
// function enterApp() {
//     React360.init(
//         'index.bundle?platform=vr&dev=true',
//         document.getElementById('initialize'), {
//             assetRoot: 'static_assets/',
//         }
//     );

//     const elem = document.getElementById('placeHolder');
//     elem.parentNode.removeChild(elem);
// }
function enterApp() {
  const elem = document.getElementById('initialize');
    while(elem.firstChild){
      elem.firstChild.remove()
    }
    // console.log("My element", elem)

    React360.init(
        'index.bundle?platform=vr&dev=true',
        document.getElementById('initialize'), {
            assetRoot: 'static_assets/',
        }
    );
    document.querySelectorAll("*").forEach(el => {
      el.style.margin = "0px";
      el.style.boxSizing = "inherit"
    });
}
// DEBUGGING
// enterApp();