import './style.scss'

const IMG = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/204808/mj.png';

const AMOUNT = 50; // max: 1000

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const getRandomColor = () => {
  const ch = getRandomArbitrary(0, 360);
  const cs = getRandomArbitrary(0, 100);
  const cl = getRandomArbitrary(0, 100);
  const ca = getRandomArbitrary(0, 0.7);

  return `hsla(${ch}, ${cs}%, ${cl}%, ${ca})`;
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


class ParticleArt {
  constructor() {
    this.canvas = document.getElementById('canvas')

    this.dpr = window.devicePixelRatio || 1;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.dpr, this.dpr);

    this.art = new Image();
    this.art.crossOrigin = "Anonymous";
    this.artSrc = IMG;

    this.particles = {};
    this.particleIds = [];

    this.setCanvasSize();
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth * this.dpr;
    this.canvas.height = window.innerHeight * this.dpr;

    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
  }

  createParticles() {
    this.ctx.drawImage(this.art, 0, 0);

    const artData = this.ctx.getImageData(0, 0, this.art.width, this.art.height);

    for (let y = 0; y < artData.height; y++) {
      for (let x = 0; x < artData.width; x++) {
        if (artData.data[(y * 4 * artData.width) + (x * 4) + 3] > 128 && getRandomArbitrary(1, 1000) < AMOUNT) {
          const id = uuidv4();
          const color = getRandomColor();
          const size = getRandomArbitrary(1, 5);

          const particle = {
            [id]: {
              x,
              y,
              size,
              color
            }
          }
          Object.assign(this.particles, particle);
          this.particleIds.push(id);
        }

      }
    }
  }

  drawParticles() {
    this.particleIds.map(id => {
      const particle = this.particles[id];

      const posX = (window.innerWidth / 2) - (this.art.width / 2) + particle.x;
      const posY = (window.innerHeight / 2) - (this.art.height / 2) + particle.y;

      this.ctx.beginPath();
      this.ctx.arc(posX * this.dpr, posY * this.dpr, particle.size * this.dpr, 0, 2 * Math.PI);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
    })
  }

  render() {
    this.art.onload = () => {

      this.createParticles();
      this.drawParticles();
    }
    this.art.src = this.artSrc;
  }
}

const particleArt = new ParticleArt();
particleArt.render();