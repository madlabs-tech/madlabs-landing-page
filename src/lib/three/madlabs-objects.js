// @ts-nocheck: vendored from references/obj-animated (designer handoff); typed via madlabs-scene.d.ts.
import * as THREE from 'three';

export class Spring {
  constructor(x = 0, k = 180, d = 14) { this.x = x; this.t = x; this.v = 0; this.k = k; this.d = d; }
  step(dt) { const a = this.k * (this.t - this.x) - this.d * this.v; this.v += a * dt; this.x += this.v * dt; return this.x; }
}

// Studio environment for glass reflections: dark room + cold softboxes.
export function makeEnv(renderer, warm = false) {
  const s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0x0e1628, side: THREE.BackSide })));
  const panel = (c, w, h, pos, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.copy(pos); m.lookAt(0, 0, 0); s.add(m);
  };
  panel(0xffffff, 9, 4, new THREE.Vector3(0, 10, 4), 3);
  panel(warm ? 0xffc566 : 0x7fe3ff, 3, 12, new THREE.Vector3(-9, 2, 3), 2.4);
  panel(warm ? 0xfff1d6 : 0x5f8bff, 3, 12, new THREE.Vector3(9, 2, -2), 2.2);
  panel(warm ? 0xffb547 : 0x45e2b9, 7, 2, new THREE.Vector3(0, -1, -9), 1.4);
  panel(0xffffff, 2, 6, new THREE.Vector3(6, 3, 7), 2);
  const pm = new THREE.PMREMGenerator(renderer);
  const tex = pm.fromScene(s, 0.03).texture;
  pm.dispose();
  return tex;
}

const mat = (name, o) => new THREE.MeshPhysicalMaterial({ name, metalness: 0, ...o });
const glow = (name, color, emissive, k = 1) => mat(name, { color, emissive, emissiveIntensity: k, roughness: 0.18, clearcoat: 0.6 });
const glassMat = (name) => mat(name, {
  color: 0xeaf6ff, roughness: 0.05, transparent: true, opacity: 0.22, clearcoat: 1, clearcoatRoughness: 0.03,
  side: THREE.DoubleSide, depthWrite: false, envMapIntensity: 1.8, specularIntensity: 1,
});
const mesh = (name, geo, m, pick) => { const o = new THREE.Mesh(geo, m); o.name = name; if (pick) o.userData.pick = pick; return o; };
const v2 = (pts) => pts.map(([r, y]) => new THREE.Vector2(r, y));

function themeGlass(glass, theme) {
  glass.color.set(theme === 'light' ? 0x8eb1ff : 0xeaf6ff);
  glass.opacity = theme === 'light' ? 0.3 : 0.22;
}

/* ---------- Madlabs: Erlenmeyer flask + floating molecules ---------- */
export function buildFlask() {
  const M = {
    glass: glassMat('glass'),
    rim: mat('glass_rim', { color: 0xeafbff, roughness: 0.04, transparent: true, opacity: 0.6, clearcoat: 1, envMapIntensity: 2.2 }),
    reagent: glow('reagent', 0x45d4f7, 0x0fa8cf, 0.6),
    bubble: mat('bubble', { color: 0xeafbff, transparent: true, opacity: 0.6, roughness: 0.05, emissive: 0x7fe3ff, emissiveIntensity: 0.5 }),
    btc: mat('bitcoin_orange', { color: 0xf7931a, emissive: 0xf7931a, emissiveIntensity: 0.35, roughness: 0.22, metalness: 0.35, clearcoat: 1 }),
    btcEdge: mat('bitcoin_edge', { color: 0xffc566, emissive: 0xf7931a, emissiveIntensity: 0.2, roughness: 0.25, metalness: 0.4, clearcoat: 1 }),
    glyph: glow('glyph_white', 0xffffff, 0xf7fafd, 0.4),
    ethTop: mat('eth_light', { color: 0xb7b3ff, emissive: 0x7b74ff, emissiveIntensity: 0.45, roughness: 0.15, clearcoat: 1, flatShading: true }),
    ethBot: mat('eth_dark', { color: 0x7b74ff, emissive: 0x5f57e8, emissiveIntensity: 0.45, roughness: 0.15, clearcoat: 1, flatShading: true }),
    link: mat('chain_mint', { color: 0x45e2b9, emissive: 0x19d3a2, emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.3, clearcoat: 1 }),
  };
  const root = new THREE.Group(); root.name = 'madlabs_flask';
  const tilt = new THREE.Group(); tilt.name = 'tilt'; root.add(tilt);
  const body = new THREE.Group(); body.name = 'flask'; tilt.add(body);

  const outer = [[0, 0], [0.40, 0], [0.47, 0.008], [0.52, 0.03], [0.548, 0.07], [0.552, 0.11], [0.451, 0.33], [0.35, 0.55],
    [0.25, 0.77], [0.19, 0.9], [0.165, 0.97], [0.155, 1.04], [0.155, 1.36], [0.178, 1.385], [0.19, 1.41], [0.18, 1.43], [0.15, 1.43]];
  const glass = mesh('flask_glass', new THREE.LatheGeometry(v2(outer), 96), M.glass, 'flask');
  glass.renderOrder = 2; glass.castShadow = false;
  body.add(glass);
  const lip = mesh('lip_rim', new THREE.TorusGeometry(0.186, 0.011, 16, 96), M.rim, 'flask');
  lip.rotation.x = Math.PI / 2; lip.position.y = 1.412; body.add(lip);
  const base = mesh('base_rim', new THREE.TorusGeometry(0.538, 0.008, 12, 128), M.rim, 'flask');
  base.rotation.x = Math.PI / 2; base.position.y = 0.06; body.add(base);
  for (let i = 0; i < 3; i++) {
    const y = 0.22 + i * 0.12, r = 0.552 - 0.458 * (y - 0.11) + 0.002;
    const tick = mesh('grad_' + (i + 1), new THREE.TorusGeometry(r, 0.004, 6, 48, 0.35), M.rim);
    tick.rotation.x = Math.PI / 2; tick.rotation.z = -0.9; tick.position.y = y; tick.scale.z = 1; body.add(tick);
  }
  const liquid = [[0, 0.018], [0.38, 0.018], [0.45, 0.03], [0.5, 0.06], [0.528, 0.11], [0.353, 0.5], [0, 0.5]];
  const reagent = mesh('reagent', new THREE.LatheGeometry(v2(liquid), 96), M.reagent, 'flask');
  reagent.renderOrder = 1; body.add(reagent);

  const light = new THREE.PointLight(0x45d4f7, 3, 3.5, 2); light.name = 'reagent_glow'; light.position.y = 0.35; body.add(light);

  const sphere = new THREE.SphereGeometry(1, 20, 14);
  const limit = (y) => (y < 0.11 ? 0.45 : 0.528 - 0.458 * (y - 0.11)) - 0.05;
  const bubbles = [];
  for (let i = 0; i < 18; i++) {
    const b = mesh('bubble_' + (i + 1), sphere, M.bubble, 'flask'); b.castShadow = false;
    b.userData.s = { a: Math.random() * 6.28, f: Math.random() * 0.75, y: 0.04 + Math.random() * 0.44, sp: 0.12 + Math.random() * 0.16, r: 0.012 + Math.random() * 0.02, ph: Math.random() * 6 };
    body.add(b); bubbles.push(b);
  }
  const vapor = [];
  for (let i = 0; i < 7; i++) {
    const b = mesh('vapor_' + (i + 1), sphere, M.bubble); b.castShadow = false;
    b.userData.s = { a: Math.random() * 6.28, y: 1.2 + (i / 7) * 0.9, sp: 0.18 + Math.random() * 0.1, r: 0.02 + Math.random() * 0.018 };
    tilt.add(b); vapor.push(b);
  }

  function bitcoin(name) {
    const g = new THREE.Group(); g.name = name; const R = 0.15;
    const disc = mesh(name + '_coin', new THREE.CylinderGeometry(R, R, 0.034, 64), M.btc, name); disc.rotation.x = Math.PI / 2; g.add(disc);
    const edge = mesh(name + '_rim', new THREE.TorusGeometry(R, 0.017, 12, 64), M.btcEdge, name); g.add(edge);
    const B = new THREE.Shape();
    B.moveTo(-0.55, -1); B.lineTo(0.15, -1); B.bezierCurveTo(0.78, -1, 0.78, -0.02, 0.15, -0.02);
    B.bezierCurveTo(0.62, 0.02, 0.62, 1, 0.1, 1); B.lineTo(-0.55, 1); B.closePath();
    const h1 = new THREE.Path(); h1.moveTo(-0.25, -0.72); h1.lineTo(0.12, -0.72); h1.bezierCurveTo(0.44, -0.72, 0.44, -0.26, 0.12, -0.26); h1.lineTo(-0.25, -0.26); h1.closePath();
    const h2 = new THREE.Path(); h2.moveTo(-0.25, 0.24); h2.lineTo(0.08, 0.24); h2.bezierCurveTo(0.34, 0.24, 0.34, 0.74, 0.08, 0.74); h2.lineTo(-0.25, 0.74); h2.closePath();
    B.holes.push(h1, h2);
    const bar = (x, y0, y1) => { const s = new THREE.Shape(); s.moveTo(x, y0); s.lineTo(x + 0.13, y0); s.lineTo(x + 0.13, y1); s.lineTo(x, y1); s.closePath(); return s; };
    const shapes = [B, bar(-0.3, 0.95, 1.28), bar(0.0, 0.95, 1.28), bar(-0.3, -1.28, -0.95), bar(0.0, -1.28, -0.95)];
    const gGeo = new THREE.ExtrudeGeometry(shapes, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 16 });
    [1, -1].forEach((side, k) => {
      const gl = mesh(name + '_glyph_' + (k ? 'back' : 'front'), gGeo, M.glyph, name);
      gl.scale.setScalar(0.068);
      if (side < 0) gl.rotation.y = Math.PI;
      gl.rotation.z = -0.2;
      gl.position.z = side * 0.016; g.add(gl);
    });
    return g;
  }
  function ethereum(name) {
    const g = new THREE.Group(); g.name = name;
    const top = mesh(name + '_upper', new THREE.ConeGeometry(0.11, 0.2, 4), M.ethTop, name); top.position.y = 0.1; g.add(top);
    const mid = mesh(name + '_mid', new THREE.ConeGeometry(0.11, 0.06, 4), M.ethBot, name); mid.rotation.x = Math.PI; mid.position.y = -0.03; g.add(mid);
    const cap = mesh(name + '_chevron', new THREE.ConeGeometry(0.11, 0.035, 4), M.ethTop, name); cap.position.y = -0.075; g.add(cap);
    const bot = mesh(name + '_lower', new THREE.ConeGeometry(0.11, 0.13, 4), M.ethBot, name); bot.rotation.x = Math.PI; bot.position.y = -0.125; g.add(bot);
    return g;
  }
  function chain(name) {
    const g = new THREE.Group(); g.name = name;
    const geo = new THREE.TorusGeometry(0.075, 0.022, 16, 48);
    const a = mesh(name + '_link_1', geo, M.link, name); a.scale.set(1.35, 1, 1); a.position.x = -0.065; g.add(a);
    const b = mesh(name + '_link_2', geo, M.link, name); b.scale.set(1.35, 1, 1); b.rotation.x = Math.PI / 2; b.position.x = 0.065; g.add(b);
    return g;
  }
  const mols = [
    { g: bitcoin('token_bitcoin'), r: 0.52, h: 1.74, ph: 0, sp: 0.5 },
    { g: ethereum('token_ethereum'), r: 0.64, h: 2.04, ph: 2.1, sp: 0.38 },
    { g: chain('chain_link'), r: 0.46, h: 2.34, ph: 4.2, sp: 0.6 },
  ];
  mols.forEach((m) => { m.spin = new Spring(0, 60, 6); m.pop = new Spring(1, 260, 10); tilt.add(m.g); });

  const squish = new Spring(1, 260, 9), spread = new Spring(0, 90, 11);
  let energy = 0, reactions = 0, onStatus = () => {};
  const status = () => onStatus(`3 tokens · ${reactions} reaction${reactions === 1 ? '' : 's'}`);

  function place(t) {
    mols.forEach((m, i) => {
      const a = m.ph + t * m.sp, r = m.r + spread.x;
      m.g.position.set(Math.cos(a) * r, m.h + Math.sin(t * 1.3 + i) * 0.05 + spread.x * 0.4, Math.sin(a) * r);
    });
  }
  place(0);

  return {
    root, tilt,
    set onStatus(f) { onStatus = f; status(); },
    setTheme(th) { themeGlass(M.glass, th); },
    click(key) {
      if (key === 'flask') { energy = 1; squish.v -= 3.2; spread.t = 0.28; reactions++; status(); setTimeout(() => (spread.t = 0), 900); }
      else { const m = mols.find((x) => x.g.name === key); if (m) { m.spin.v += 40; m.pop.v += 9; } }
    },
    update(dt, t) {
      energy = Math.max(0, energy - dt * 0.6);
      const sy = squish.step(dt); spread.step(dt);
      body.scale.set(1 + (1 - sy) * 0.6, sy, 1 + (1 - sy) * 0.6);
      M.reagent.emissiveIntensity = 0.6 + energy * 1.6 + Math.sin(t * 2) * 0.08;
      light.intensity = 3 + energy * 6;
      const mult = 1 + energy * 5;
      bubbles.forEach((b) => {
        const s = b.userData.s;
        s.y += s.sp * mult * dt;
        if (s.y > 0.47) { s.y = 0.04; s.a = Math.random() * 6.28; s.f = Math.random() * 0.75; }
        const rr = limit(s.y) * s.f + Math.sin(t * 4 + s.ph) * 0.008;
        b.position.set(Math.cos(s.a) * rr, s.y, Math.sin(s.a) * rr);
        b.scale.setScalar(s.r * (0.7 + s.y));
      });
      vapor.forEach((b) => {
        const s = b.userData.s;
        s.y += s.sp * (1 + energy * 3) * dt;
        if (s.y > 2.15) { s.y = 1.2; s.a = Math.random() * 6.28; }
        const k = Math.max(0, s.y - 1.43), rr = 0.05 + k * 0.35;
        b.position.set(Math.cos(s.a + k) * rr, s.y, Math.sin(s.a + k) * rr);
        b.scale.setScalar(s.r * Math.max(0.05, 1 - k * 1.3));
      });
      place(t);
      mols.forEach((m, i) => {
        m.spin.step(dt); const p = m.pop.step(dt);
        m.g.rotation.y += dt * (0.6 + m.spin.v * 0.1 + i * 0.2) + m.spin.x * 0;
        m.g.rotation.x = Math.sin(t * 0.7 + i) * 0.25;
        m.g.scale.setScalar(1.6 * Math.max(0.3, p));
        m.spin.t = 0;
      });
    },
  };
}

/* ---------- Sun: glowing core + orbiting agent nodes ---------- */
export function buildSun() {
  const glass = glassMat('glass');
  const M = {
    glass,
    core: glow('core_glow', 0xffc566, 0xffa21a, 1.4),
    ray: glow('corona', 0xfff1d6, 0xffb547, 1.0),
    track: mat('orbit_track', { color: 0xfff1d6, transparent: true, opacity: 0.3, roughness: 0.2 }),
    pulse: glow('pulse', 0xffffff, 0xfff1d6, 1.6),
    ledOk: glow('led_ok', 0x45e2b9, 0x19d3a2, 1.4),
    ledDown: glow('led_down', 0xff4f6e, 0xff4f6e, 1.4),
    offline: glow('agent_offline', 0x5a6b87, 0x3f4e68, 0.25),
  };
  const AG = [['white', 0xffffff, 0xfff1d6], ['mint', 0x45e2b9, 0x19d3a2], ['amber', 0xffc566, 0xffb547], ['frost', 0x9a94ff, 0x7b74ff], ['cream', 0xfff1d6, 0xffc566]];

  const root = new THREE.Group(); root.name = 'sun_orchestrator';
  const tilt = new THREE.Group(); tilt.name = 'tilt'; root.add(tilt);
  const sys = new THREE.Group(); sys.name = 'system'; sys.rotation.set(0.2, 0, 0.08); tilt.add(sys);

  const sphere = new THREE.SphereGeometry(1, 48, 32);
  const coreG = new THREE.Group(); coreG.name = 'sun'; sys.add(coreG);
  const core = mesh('sun_core', sphere, M.core, 'core'); core.scale.setScalar(0.32); coreG.add(core);
  const shellMat = mat('core_shell', { color: 0xfff1d6, roughness: 0.04, transparent: true, opacity: 0.1, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false, envMapIntensity: 2.2 });
  const shell = mesh('sun_shell', sphere, shellMat, 'core'); shell.scale.setScalar(0.46); shell.renderOrder = 2; shell.castShadow = false; coreG.add(shell);
  const light = new THREE.PointLight(0xffc566, 4, 4, 2); light.name = 'sun_light'; coreG.add(light);

  const rays = new THREE.Group(); rays.name = 'corona'; coreG.add(rays);
  const rayGeo = new THREE.CapsuleGeometry(0.024, 0.11, 4, 12);
  const N = 18, golden = Math.PI * (3 - Math.sqrt(5)), Y = new THREE.Vector3(0, 1, 0), rayList = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
    const d = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r);
    const m = mesh('ray_' + (i + 1), rayGeo, M.ray, 'core');
    m.quaternion.setFromUnitVectors(Y, d); m.position.copy(d).multiplyScalar(0.57);
    m.userData.d = d; rays.add(m); rayList.push(m);
  }

  const track = mesh('orbit_track', new THREE.TorusGeometry(1.25, 0.006, 8, 160), M.track);
  track.rotation.x = Math.PI / 2; track.castShadow = false; sys.add(track);

  const shape = new THREE.Shape(); const w = 0.15, rc = 0.07;
  shape.moveTo(-w + rc, -w); shape.lineTo(w - rc, -w); shape.quadraticCurveTo(w, -w, w, -w + rc); shape.lineTo(w, w - rc);
  shape.quadraticCurveTo(w, w, w - rc, w); shape.lineTo(-w + rc, w); shape.quadraticCurveTo(-w, w, -w, w - rc);
  shape.lineTo(-w, -w + rc); shape.quadraticCurveTo(-w, -w, -w + rc, -w);
  const chipGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 5, curveSegments: 12 }).center();
  const linkGeo = new THREE.CylinderGeometry(0.007, 0.007, 1, 8);
  const pulseGeo = new THREE.SphereGeometry(0.026, 16, 12);

  const ring = new THREE.Group(); ring.name = 'agents'; sys.add(ring);
  const agents = AG.map(([nm, c, e], i) => {
    const arm = new THREE.Group(); arm.name = 'arm_' + (i + 1); arm.rotation.y = (i / AG.length) * Math.PI * 2; ring.add(arm);
    const linkMat = mat('link_' + (i + 1), { color: 0xfff1d6, emissive: 0xffc566, emissiveIntensity: 0.5, transparent: true, opacity: 0.55, roughness: 0.3 });
    const link = mesh('link_' + (i + 1), linkGeo, linkMat); link.rotation.z = Math.PI / 2; link.scale.y = 0.6; link.position.x = 0.8; link.castShadow = false; arm.add(link);
    const node = new THREE.Group(); node.name = 'agent_' + (i + 1); node.position.x = 1.25; arm.add(node);
    const coreMat = glow('agent_' + nm, c, e, 1.1);
    const chip = mesh('agent_' + (i + 1) + '_shell', chipGeo, glass, 'agent:' + i); chip.rotation.y = Math.PI / 2; chip.renderOrder = 2; chip.castShadow = false; node.add(chip);
    const heart = mesh('agent_' + (i + 1) + '_core', sphere, coreMat, 'agent:' + i); heart.scale.setScalar(0.075); node.add(heart);
    const led = mesh('agent_' + (i + 1) + '_led', pulseGeo, M.ledOk, 'agent:' + i); led.scale.setScalar(0.85); led.position.y = 0.2; node.add(led);
    const pulses = [0, 0.5].map((o, k) => { const p = mesh('pulse_' + (i + 1) + '_' + (k + 1), pulseGeo, M.pulse); p.userData.o = o; p.castShadow = false; arm.add(p); return p; });
    return { arm, node, heart, led, link, linkMat, coreMat, pulses, drop: new Spring(0, 120, 10), boost: 0, phase: 0, down: false };
  });

  const punch = new Spring(1, 280, 10);
  let energy = 0, failovers = 0, busy = false, onStatus = () => {};
  const idle = () => onStatus(`5 agents online · ${failovers} failover${failovers === 1 ? '' : 's'}`);

  function failover(i) {
    if (busy) return;
    busy = true; failovers++;
    const a = agents[i], b = agents[(i + 1) % agents.length], j = (i + 1) % agents.length;
    a.down = true; a.drop.t = -0.14; a.heart.material = M.offline; a.led.material = M.ledDown; a.linkMat.opacity = 0.1;
    b.boost = 1;
    onStatus(`agent-${i + 1} down → failover to agent-${j + 1} · 0.4s`);
    setTimeout(() => {
      a.down = false; a.drop.t = 0; a.drop.v += 2; a.heart.material = a.coreMat; a.led.material = M.ledOk; a.linkMat.opacity = 0.55; b.boost = 0;
      onStatus(`agent-${i + 1} back online`);
      setTimeout(() => { busy = false; idle(); }, 1400);
    }, 3200);
  }

  return {
    root, tilt,
    set onStatus(f) { onStatus = f; idle(); },
    setTheme(th) { themeGlass(glass, th); },
    click(key) {
      if (key === 'core') { energy = 1; punch.v += 6; }
      else if (key.startsWith('agent:')) failover(+key.split(':')[1]);
    },
    update(dt, t) {
      energy = Math.max(0, energy - dt * 0.7);
      const p = punch.step(dt);
      coreG.scale.setScalar(p);
      M.core.emissiveIntensity = 1.3 + energy * 1.5 + Math.sin(t * 2.2) * 0.12;
      light.intensity = 4 + energy * 8;
      rays.rotation.y -= dt * 0.25; rays.rotation.x = Math.sin(t * 0.3) * 0.2;
      rayList.forEach((r, i) => { const s = 1 + Math.sin(t * 3 + i * 1.7) * 0.25 + energy * 0.9; r.scale.set(1, s, 1); r.position.copy(r.userData.d).multiplyScalar(0.57 + (s - 1) * 0.06); });
      ring.rotation.y += dt * 0.16;
      agents.forEach((a, i) => {
        a.node.position.y = Math.sin(t * 1.4 + i * 1.3) * 0.035 + a.drop.step(dt);
        a.node.rotation.y = Math.sin(t * 0.8 + i) * 0.25;
        a.heart.material.emissiveIntensity = a.down ? 0.25 : 1.1 + a.boost * 1.2 + Math.sin(t * 3 + i) * 0.1;
        a.phase += dt * (0.45 + energy * 1.4) * (1 + a.boost);
        a.pulses.forEach((pl) => {
          const f = (a.phase + pl.userData.o) % 1;
          pl.visible = !a.down;
          pl.position.set(0.5 + f * 0.6, 0, 0);
          pl.scale.setScalar(Math.sin(f * Math.PI) * (1 + a.boost * 0.4));
        });
      });
    },
  };
}

/* ---------- Shared wiring: env, tilt-to-cursor, idle auto-rotate, click picking ---------- */
export function wire(stage, panel, model) {
  const c = stage.controls;
  c.enableZoom = false; c.enablePan = false; c.autoRotateSpeed = 0.9;
  c.minPolarAngle = 0.35; c.maxPolarAngle = 1.75;
  let idleT;
  c.addEventListener('start', () => clearTimeout(idleT));
  c.addEventListener('end', () => { clearTimeout(idleT); idleT = setTimeout(() => (c.autoRotate = stage.hasAttribute('autorotate')), 3500); });

  const canvas = stage.renderer.domElement;
  canvas.style.cursor = 'grab';
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const ptr = { x: 0, y: 0, on: false };
  const pick = (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, stage.camera);
    for (const h of ray.intersectObject(model.root, true)) { let o = h.object; while (o && !o.userData.pick) o = o.parent; if (o) return o.userData.pick; }
    return null;
  };
  panel.addEventListener('pointermove', (e) => {
    const r = panel.getBoundingClientRect();
    ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1; ptr.y = ((e.clientY - r.top) / r.height) * 2 - 1; ptr.on = true;
    canvas.style.cursor = e.buttons ? 'grabbing' : pick(e) ? 'pointer' : 'grab';
  });
  panel.addEventListener('pointerleave', () => (ptr.on = false));
  let down = null;
  canvas.addEventListener('pointerdown', (e) => (down = { x: e.clientX, y: e.clientY }));
  canvas.addEventListener('pointerup', (e) => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
    if (moved < 5) { const k = pick(e); if (k) model.click(k); }
  });

  const q = new THREE.Quaternion(), qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), right = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  stage.onFrame = (dt, t) => {
    right.setFromMatrixColumn(stage.camera.matrixWorld, 0);
    qa.setFromAxisAngle(up, (ptr.on ? ptr.x : 0) * 0.35);
    qb.setFromAxisAngle(right, (ptr.on ? ptr.y : 0) * 0.2);
    q.multiplyQuaternions(qa, qb);
    model.tilt.quaternion.slerp(q, 1 - Math.exp(-dt * 4));
    model.update(dt, t);
  };
}
