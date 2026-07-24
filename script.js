const canvas = document.getElementById('coin-canvas');

// Scene, Camera, Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lights Setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffd700, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xffa500, 2, 50);
pointLight.position.set(-5, -5, 5);
scene.add(pointLight);

// Coin Geometry & Material
const coinGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.15, 32);
const coinMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  metalness: 0.9,
  roughness: 0.2,
});

// Coins
const coins = [];
const coinCount = 40;

for (let i = 0; i < coinCount; i++) {
  const coin = new THREE.Mesh(coinGeometry, coinMaterial);
  coin.position.x = (Math.random() - 0.5) * 20;
  coin.position.y = Math.random() * 20 - 10;
  coin.position.z = (Math.random() - 0.5) * 10;
  coin.rotation.x = Math.random() * Math.PI;
  coin.rotation.z = Math.random() * Math.PI;
  coin.userData = {
    fallSpeed: Math.random() * 0.05 + 0.02,
    rotSpeedX: (Math.random() - 0.5) * 0.04,
    rotSpeedY: (Math.random() - 0.5) * 0.04
  };
  coins.push(coin);
  scene.add(coin);
}

camera.position.z = 12;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  coins.forEach(coin => {
    coin.position.y -= coin.userData.fallSpeed;
    coin.rotation.x += coin.userData.rotSpeedX;
    coin.rotation.y += coin.userData.rotSpeedY;
    if (coin.position.y < -10) {
      coin.position.y = 10;
      coin.position.x = (Math.random() - 0.5) * 20;
    }
  });
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
