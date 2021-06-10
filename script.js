// Create Scene
const heightScreen = 700;
const widthScreen = 400;
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = `${widthScreen}px`;
screen.style.height = `${heightScreen}px`;
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";
screen.style.overflow = "hidden";

// Create the platform
const heightPlatform = 20;
const platforms = [
  { top: 80, left: 10, width: 45 },
  { top: 150, left: 30, width: 45 },
  { top: 220, left: 50, width: 45 },
  { top: 290, left: 70, width: 45 },
  { top: 360, left: 90, width: 45 },
  { top: 430, left: 110, width: 45 },
  { top: 80, right: 10, width: 45 },
  { top: 150, right: 30, width: 45 },
  { top: 220, right: 50, width: 45 },
  { top: 290, right: 70, width: 45 },
  { top: 360, right: 90, width: 45 },
  { top: 430, right: 110, width: 45 },
  
];

function createPlatorm(d) {
  const pf = document.createElement('div');
  pf.style.position = "absolute";
  pf.style.top = `${d.top}px`;
  if (d.left) pf.style.left = `${d.left}px`
    else pf.style.right = `${d.right}px`;
  pf.style.width = `${d.width}px`;
  pf.style.height = `${heightPlatform}px`;
  pf.style.backgroundColor = 'grey';
  pf.style.border = "2px solid black";
  return pf;
}

// Create Tonneau
class Tonneau {
  constructor(x) {
    this.posX = x;
    this.posY = 0;
    this.intervalID = 0;
    // Create tonneau
    this.t = document.createElement('div');
    this.t.style.position = "absolute";
    this.t.style.top = `${this.posY}px`;
    this.t.style.left = `${this.posX}px`;
    this.t.style.width = "30px";
    this.t.style.height = "22px";
    this.t.style.backgroundColor = "brown";
    this.t.style.border = "1px solid black";
    this.t.style.borderRadius = "8px";
    this.initialization();

    
  }

  

  initialization = () => {
    this.intervalID = setInterval(() => {
      this.posY += 5;
      this.t.style.top = `${this.posY}px`;
      this.detectionSurface();
    }, 100);
  }

  getT() {
    return this.t;
  }

  // TODO
  detectionSurface = () => {

    let tPositionX = this.posX;
    let tPositionY = parseInt(this.t.style.top)+22;
    let ti = this.intervalID;

    platforms.forEach( p => checkLeftOrRight(p))

    function checkLeftOrRight(p){

      let pLeftTopSide = p.left + p.width;
      let pRight = widthScreen - (p.right + p.width);
      let pRightTopSide = pRight + p.width;


      if (p.left && tPositionX < 200) {

        if (tPositionX >= p.left && tPositionX <= pLeftTopSide) {
      
          if (tPositionY >= p.top) {
            clearInterval(ti)
          }
        }
      } 
      

      if (p.right && tPositionX >= 200) {

        if (tPositionX >= pRight) {
         
          if (tPositionY >= p.top) {
            clearInterval(ti)
          }
        } 
      } 

    }
  

    // If surface detected
    //clearInterval(this.intervalID);
  }

}


function generateTonneau() {
  setInterval(() => {
    const randomX = Math.floor(Math.random() * widthScreen);
    const newT = new Tonneau(randomX);
    screen.appendChild(newT.getT());
  }, 500);
}

// Append the platform
platforms.forEach(d => screen.appendChild(createPlatorm(d)))
root.appendChild(screen);

// Generate Tonneaux
generateTonneau();


