// @ts-nocheck: vendored from references/obj-animated (designer handoff); typed via madlabs-scene.d.ts.
// Standalone runtime for the Madlabs 3D hero objects. No custom element, no GLB.
// Usage: const h = mountMadlabsObject(el, { kind: 'flask' | 'sun' }); … h.destroy();
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildFlask, buildSun, makeEnv, wire } from './madlabs-objects.js';

export function mountMadlabsObject(container, opts = {}) {
  const {
    kind = 'flask',          // 'flask' (Madlabs) | 'sun' (Sun orchestrator)
    theme = 'dark',          // 'dark' | 'light'
    autorotate = true,       // idle turntable, resumes 3.5s after drag
    shadow = 0.3,            // ground shadow opacity
    frame = 1.12,            // camera distance multiplier (lower = bigger object)
    onStatus = () => {},     // status line text, e.g. "agent-2 down → failover…"
    motion = true,           // Madlabs addition: false (prefers-reduced-motion) = still scene that only animates for a moment after a click or drag
  } = opts;
  const warm = kind === 'sun';

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.touchAction = 'pan-y';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.environment = makeEnv(renderer, warm);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = autorotate && motion;
  controls.addEventListener('start', () => (controls.autoRotate = false));

  scene.add(new THREE.HemisphereLight(warm ? 0xfff8ec : 0xeaf4ff, warm ? 0x2a2418 : 0x1a2a4a, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(4, 7, 5); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0002;
  scene.add(key);
  const fill = new THREE.DirectionalLight(warm ? 0xfff1d6 : 0x7fe3ff, 1.1); fill.position.set(-5, 3, -4); scene.add(fill);
  const rim = new THREE.DirectionalLight(warm ? 0xffc566 : 0x5f8bff, 1.2); rim.position.set(0, 2, -6); scene.add(rim);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: shadow }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

  const model = kind === 'sun' ? buildSun() : buildFlask();
  model.root.traverse((o) => { if (o.isMesh && o.castShadow !== false) { o.castShadow = true; o.receiveShadow = true; } });
  scene.add(model.root);

  // Frame camera to the object's bounds (same as the design preview).
  const box = new THREE.Box3().setFromObject(model.root);
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  ground.position.y = box.min.y;
  const dist = (sphere.radius / Math.tan((camera.fov * Math.PI) / 360)) * frame;
  camera.position.copy(sphere.center).add(new THREE.Vector3(1, 0.55, 1.25).normalize().multiplyScalar(dist));
  camera.near = Math.max(dist / 100, 0.01); camera.far = dist * 100; camera.updateProjectionMatrix();
  controls.target.copy(sphere.center); controls.update();
  const span = sphere.radius * 3;
  Object.assign(key.shadow.camera, { left: -span, right: span, top: span, bottom: -span });
  key.shadow.camera.updateProjectionMatrix();

  // Stage shim so the shared interaction wiring runs unchanged.
  const stage = { renderer, camera, controls, onFrame: null, hasAttribute: (a) => a === 'autorotate' && autorotate && motion };
  wire(stage, container, model);
  model.onStatus = onStatus;

  const setTheme = (th) => { model.setTheme(th); ground.material.opacity = th === 'dark' ? shadow : shadow * 0.47; };
  setTheme(theme);

  const fit = () => {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  fit();
  const ro = new ResizeObserver(fit); ro.observe(container);

  // Pause rendering when scrolled off-screen.
  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(container);

  // Madlabs addition: with motion off, model time only runs for a moment after the visitor interacts.
  let liveUntil = motion ? Infinity : 0, first = true;
  const wake = () => (liveUntil = performance.now() + 2500);
  if (!motion) container.addEventListener('pointerdown', wake);

  let last = performance.now();
  renderer.setAnimationLoop(() => {
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 1 / 30); last = now;
    if (!visible) return;
    if (first || now < liveUntil) stage.onFrame && stage.onFrame(first ? 1 / 60 : dt, now / 1000);
    first = false;
    controls.update();
    renderer.render(scene, camera);
  });

  return {
    setTheme,
    click: (k) => { wake(); model.click(k); },  // 'flask' | 'token_bitcoin' | 'token_ethereum' | 'chain_link' | 'core' | 'agent:0'…'agent:4'
    destroy() {
      container.removeEventListener('pointerdown', wake);
      renderer.setAnimationLoop(null); ro.disconnect(); io.disconnect(); controls.dispose();
      scene.traverse((o) => { o.geometry?.dispose(); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m?.dispose()); });
      scene.environment?.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
