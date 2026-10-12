'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PackagingShape } from '@/data/products';

export interface Product3DCanvasProps {
  shape: PackagingShape;
  bottleColor: string;
  capColor: string;
  liquidColor: string;
  labelAccent: string;
  labelTheme?: 'dark' | 'light' | 'industrial' | 'eco';
  bottleTranslucency?: number;
  brandName?: string;
  productTitle: string;
  productSubtitle: string;
  volumeText: string;
  badgeText?: string;
  explodedView?: boolean;
  wireframeMode?: boolean;
  showBubbles?: boolean;
  studioPreset?: 'lab' | 'solar' | 'eco';
  autoRotate?: boolean;
  className?: string;
}

function createLabelTexture(opts: {
  brandName: string;
  title: string;
  subtitle: string;
  volume: string;
  badge: string;
  accent: string;
  liquidColor: string;
  theme: 'dark' | 'light' | 'industrial' | 'eco';
}): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background gradient by theme
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  if (opts.theme === 'dark') {
    bgGrad.addColorStop(0, '#06152D');
    bgGrad.addColorStop(0.55, '#0B2548');
    bgGrad.addColorStop(1, '#040D1A');
  } else if (opts.theme === 'industrial') {
    bgGrad.addColorStop(0, '#0F172A');
    bgGrad.addColorStop(0.5, '#1E293B');
    bgGrad.addColorStop(1, '#090D16');
  } else if (opts.theme === 'eco') {
    bgGrad.addColorStop(0, '#052E24');
    bgGrad.addColorStop(0.55, '#064E3B');
    bgGrad.addColorStop(1, '#022C22');
  } else {
    bgGrad.addColorStop(0, '#F8FAFC');
    bgGrad.addColorStop(0.6, '#E2E8F0');
    bgGrad.addColorStop(1, '#CBD5E1');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  const isLight = opts.theme === 'light';

  // Outer frame border
  ctx.strokeStyle = opts.accent;
  ctx.lineWidth = 14;
  ctx.strokeRect(36, 36, 952, 952);

  // Subtle molecular / wave pattern
  ctx.save();
  ctx.globalAlpha = isLight ? 0.14 : 0.22;
  const waveGrad = ctx.createLinearGradient(0, 420, 1024, 820);
  waveGrad.addColorStop(0, opts.accent);
  waveGrad.addColorStop(1, opts.liquidColor);
  ctx.fillStyle = waveGrad;
  ctx.beginPath();
  ctx.moveTo(36, 620);
  ctx.bezierCurveTo(320, 500, 680, 740, 988, 560);
  ctx.lineTo(988, 988);
  ctx.lineTo(36, 988);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Top Pill Badge
  ctx.save();
  ctx.fillStyle = opts.accent;
  ctx.beginPath();
  ctx.roundRect(212, 82, 600, 64, 32);
  ctx.fill();
  ctx.fillStyle = '#040B14';
  ctx.font = '800 30px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((opts.badge || 'FORMULE HAUTE PERFORMANCE').toUpperCase(), 512, 125);
  ctx.restore();

  // Brand Emblem Header
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
  ctx.font = '900 108px Inter, system-ui, sans-serif';
  const cleanBrand = (opts.brandName || 'AMAL').toUpperCase().slice(0, 14);
  ctx.fillText(cleanBrand, 512, 275);

  ctx.fillStyle = opts.accent;
  ctx.font = '700 26px Inter, system-ui, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('SAVONNERIE & DÉTERGENCE PRO', 512, 322);
  ctx.restore();

  // Divider line
  ctx.strokeStyle = opts.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(180, 358);
  ctx.lineTo(844, 358);
  ctx.stroke();

  // Center Molecular Emblem / Active Shield
  ctx.save();
  const centerX = 512;
  const centerY = 485;
  const radGrad = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 95);
  radGrad.addColorStop(0, opts.accent);
  radGrad.addColorStop(0.65, opts.liquidColor);
  radGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 95, 0, Math.PI * 2);
  ctx.fill();

  // Hexagon inside emblem
  ctx.strokeStyle = isLight ? '#0F172A' : '#FFFFFF';
  ctx.lineWidth = 6;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const hx = centerX + Math.cos(angle) * 56;
    const hy = centerY + Math.sin(angle) * 56;
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
  ctx.font = '900 32px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PRO+', centerX, centerY + 11);
  ctx.restore();

  // Product Title
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
  ctx.font = '800 52px Inter, system-ui, sans-serif';
  const shortTitle = opts.title.replace(/^AMAL\s+/i, '').slice(0, 24);
  ctx.fillText(shortTitle.toUpperCase(), 512, 650);

  // Subtitle
  ctx.fillStyle = isLight ? '#334155' : '#CBD5E1';
  ctx.font = '600 30px Inter, system-ui, sans-serif';
  const sub = opts.subtitle.slice(0, 36);
  ctx.fillText(sub, 512, 705);
  ctx.restore();

  // Feature badges row
  const specs = ['ISO 9001', 'BIODÉGRADABLE', 'ACTIF CONCENTRÉ'];
  specs.forEach((sp, idx) => {
    const bx = 130 + idx * 265;
    const by = 748;
    ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(bx, by, 235, 54, 12);
    ctx.fill();
    ctx.strokeStyle = opts.accent;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = isLight ? '#0F172A' : '#F8FAFC';
    ctx.font = '700 21px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(sp, bx + 117, by + 35);
  });

  // Footer Volume Bar
  ctx.fillStyle = '#040B14';
  ctx.fillRect(56, 845, 912, 120);

  ctx.fillStyle = opts.accent;
  ctx.font = '900 50px Inter, system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(opts.volume.toUpperCase(), 96, 922);

  // Barcode simulation on right side of footer
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < 24; i++) {
    const bw = i % 3 === 0 ? 6 : i % 2 === 0 ? 3 : 5;
    ctx.fillRect(730 + i * 8, 868, bw, 74);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createSoapStampTexture(brandName: string): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Base warm vegetable soap color
  ctx.fillStyle = '#D4A359';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle organic grain
  for (let i = 0; i < 2500; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,245,220,0.06)' : 'rgba(120,80,20,0.06)';
    ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 6, 6);
  }

  // Bump canvas
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 1024;
  bumpCanvas.height = 1024;
  const bctx = bumpCanvas.getContext('2d')!;
  bctx.fillStyle = '#808080';
  bctx.fillRect(0, 0, 1024, 1024);

  const drawSeal = (targetCtx: CanvasRenderingContext2D, isBump: boolean) => {
    targetCtx.save();
    targetCtx.strokeStyle = isBump ? '#202020' : '#9B6B26';
    targetCtx.fillStyle = isBump ? '#252525' : '#9B6B26';
    targetCtx.lineWidth = 18;

    // Outer recessed border
    targetCtx.strokeRect(86, 86, 852, 852);

    // Circular stamp
    targetCtx.beginPath();
    targetCtx.arc(512, 512, 330, 0, Math.PI * 2);
    targetCtx.stroke();

    targetCtx.lineWidth = 8;
    targetCtx.beginPath();
    targetCtx.arc(512, 512, 295, 0, Math.PI * 2);
    targetCtx.stroke();

    targetCtx.textAlign = 'center';
    targetCtx.font = '900 62px Inter, system-ui, sans-serif';
    targetCtx.fillText('EXTRA PUR • 72%', 512, 345);

    targetCtx.font = '900 118px Inter, system-ui, sans-serif';
    targetCtx.fillText((brandName || 'AMAL').toUpperCase().slice(0, 10), 512, 535);

    targetCtx.font = '800 44px Inter, system-ui, sans-serif';
    targetCtx.fillText('SAVONNERIE TRADITIONNELLE', 512, 635);

    targetCtx.font = '800 54px Inter, system-ui, sans-serif';
    targetCtx.fillText('400g • VÉGÉTAL', 512, 725);
    targetCtx.restore();
  };

  drawSeal(ctx, false);
  drawSeal(bctx, true);

  const map = new THREE.CanvasTexture(canvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  map.anisotropy = 8;
  bumpMap.anisotropy = 8;
  return { map, bumpMap };
}

export default function Product3DCanvas({
  shape,
  bottleColor,
  capColor,
  liquidColor,
  labelAccent,
  labelTheme = 'dark',
  bottleTranslucency = 0.25,
  brandName = 'AMAL',
  productTitle,
  productSubtitle,
  volumeText,
  badgeText = 'FORMULE HAUTE PERFORMANCE',
  explodedView = false,
  wireframeMode = false,
  showBubbles = true,
  studioPreset = 'lab',
  autoRotate = true,
  className = '',
}: Product3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Store latest interactive flags in refs so animation loop reads them smoothly without recreating WebGL context
  const explodedRef = useRef(explodedView);
  const autoRotateRef = useRef(autoRotate);
  const showBubblesRef = useRef(showBubbles);

  useEffect(() => {
    explodedRef.current = explodedView;
  }, [explodedView]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    showBubblesRef.current = showBubbles;
  }, [showBubbles]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.55, 6.6);
    camera.lookAt(0, 0.1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Environment map for studio reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // Lighting setup according to studioPreset
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#ffffff', 2.4);
    keyLight.position.set(4.5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimColor =
      studioPreset === 'solar' ? '#F59E0B' : studioPreset === 'eco' ? '#10B981' : '#00E5FF';
    const fillColor =
      studioPreset === 'solar' ? '#38BDF8' : studioPreset === 'eco' ? '#34D399' : '#3B82F6';

    const rimLight = new THREE.PointLight(rimColor, 14, 12);
    rimLight.position.set(-3.8, 2.6, -2.8);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(fillColor, 8, 12);
    fillLight.position.set(3.6, -1.8, 2.5);
    scene.add(fillLight);

    // Studio Podium / Pedestal below product
    const podiumGroup = new THREE.Group();
    podiumGroup.position.y = -1.92;
    scene.add(podiumGroup);

    const podiumGeo = new THREE.CylinderGeometry(1.85, 2.05, 0.16, 64);
    const podiumMat = new THREE.MeshPhysicalMaterial({
      color: '#071529',
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
    });
    const podiumMesh = new THREE.Mesh(podiumGeo, podiumMat);
    podiumMesh.receiveShadow = true;
    podiumGroup.add(podiumMesh);

    const ringGeo = new THREE.TorusGeometry(1.88, 0.022, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: rimColor });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.08;
    podiumGroup.add(ringMesh);

    // Outer holographic tech ring
    const outerRingGeo = new THREE.RingGeometry(2.15, 2.19, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: rimColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2;
    outerRingMesh.position.y = 0.02;
    podiumGroup.add(outerRingMesh);

    // Product Root Group & Explodable Subgroups
    const productRoot = new THREE.Group();
    scene.add(productRoot);

    const bodyGroup = new THREE.Group();
    const liquidGroup = new THREE.Group();
    const capGroup = new THREE.Group();
    const labelGroup = new THREE.Group();

    productRoot.add(liquidGroup);
    productRoot.add(bodyGroup);
    productRoot.add(labelGroup);
    productRoot.add(capGroup);

    // Shared Physical Materials
    const isClear = bottleTranslucency > 0.45;
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(bottleColor),
      roughness: isClear ? 0.1 : 0.22,
      metalness: 0.04,
      transmission: isClear ? Math.min(0.88, bottleTranslucency) : 0,
      transparent: isClear,
      opacity: isClear ? 0.92 : 1,
      ior: 1.49, // PET / HDPE index of refraction
      reflectivity: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12,
      wireframe: wireframeMode,
    });

    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(liquidColor),
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.38,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1.0,
      emissive: new THREE.Color(liquidColor),
      emissiveIntensity: 0.12,
      wireframe: wireframeMode,
    });

    const capMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(capColor),
      roughness: 0.24,
      metalness: 0.15,
      clearcoat: 0.7,
      wireframe: wireframeMode,
    });

    const labelTexture = createLabelTexture({
      brandName,
      title: productTitle,
      subtitle: productSubtitle,
      volume: volumeText,
      badge: badgeText,
      accent: labelAccent,
      liquidColor,
      theme: labelTheme,
    });

    const labelMat = new THREE.MeshPhysicalMaterial({
      map: labelTexture,
      roughness: 0.25,
      metalness: 0.08,
      clearcoat: 0.65,
      side: THREE.DoubleSide,
      wireframe: wireframeMode,
    });

    // Build Geometry according to `shape`
    if (shape === 'detergent_bottle') {
      // Sculpted 3L Laundry Detergent Bottle with ergonomic side handle
      const points = [
        new THREE.Vector2(0.0, -1.65),
        new THREE.Vector2(0.92, -1.65),
        new THREE.Vector2(1.02, -1.48),
        new THREE.Vector2(1.04, -0.45),
        new THREE.Vector2(0.96, 0.55),
        new THREE.Vector2(0.62, 1.18),
        new THREE.Vector2(0.32, 1.45),
        new THREE.Vector2(0.32, 1.65),
      ];
      const latheGeo = new THREE.LatheGeometry(points, 64);
      latheGeo.scale(1.0, 1.0, 0.68);
      const bottleMesh = new THREE.Mesh(latheGeo, bottleMat);
      bottleMesh.castShadow = true;
      bodyGroup.add(bottleMesh);

      // Sculpted ergonomic side handle
      const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.68, 0.95, 0),
        new THREE.Vector3(1.22, 0.72, 0),
        new THREE.Vector3(1.25, -0.05, 0),
        new THREE.Vector3(0.88, -0.42, 0),
      ]);
      const handleGeo = new THREE.TubeGeometry(handleCurve, 32, 0.16, 20, false);
      handleGeo.scale(1, 1, 0.72);
      const handleMesh = new THREE.Mesh(handleGeo, bottleMat);
      bodyGroup.add(handleMesh);

      // Inner concentrated liquid core
      const liqPoints = [
        new THREE.Vector2(0.0, -1.56),
        new THREE.Vector2(0.84, -1.56),
        new THREE.Vector2(0.93, -1.35),
        new THREE.Vector2(0.94, -0.4),
        new THREE.Vector2(0.85, 0.48),
        new THREE.Vector2(0.0, 0.48),
      ];
      const liqGeo = new THREE.LatheGeometry(liqPoints, 48);
      liqGeo.scale(0.96, 1.0, 0.64);
      const liqMesh = new THREE.Mesh(liqGeo, liquidMat);
      liquidGroup.add(liqMesh);

      // Measuring dosing cap with grip ribs
      const capBaseGeo = new THREE.CylinderGeometry(0.36, 0.39, 0.46, 36);
      const capMesh = new THREE.Mesh(capBaseGeo, capMat);
      capMesh.position.y = 1.82;
      capGroup.add(capMesh);

      const capRingGeo = new THREE.TorusGeometry(0.38, 0.035, 12, 36);
      const capRing = new THREE.Mesh(capRingGeo, capMat);
      capRing.rotation.x = Math.PI / 2;
      capRing.position.y = 1.62;
      capGroup.add(capRing);

      // Curved front & back label
      const labelGeo = new THREE.CylinderGeometry(0.98, 1.03, 1.62, 48, 1, true, -Math.PI * 0.34, Math.PI * 0.68);
      labelGeo.scale(1.01, 1.0, 0.69);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.22;
      labelGroup.add(labelMesh);
    } else if (shape === 'dish_bottle') {
      // Sleek contoured 1L Dish Soap Bottle
      const points = [
        new THREE.Vector2(0.0, -1.68),
        new THREE.Vector2(0.68, -1.68),
        new THREE.Vector2(0.76, -1.45),
        new THREE.Vector2(0.74, -0.55),
        new THREE.Vector2(0.61, 0.05), // ergonomic waist
        new THREE.Vector2(0.71, 0.68),
        new THREE.Vector2(0.48, 1.25),
        new THREE.Vector2(0.22, 1.52),
        new THREE.Vector2(0.22, 1.68),
      ];
      const latheGeo = new THREE.LatheGeometry(points, 64);
      latheGeo.scale(1.0, 1.0, 0.76);
      const bottleMesh = new THREE.Mesh(latheGeo, bottleMat);
      bottleMesh.castShadow = true;
      bodyGroup.add(bottleMesh);

      // Inner emerald/citrus gel liquid
      const liqPoints = [
        new THREE.Vector2(0.0, -1.6),
        new THREE.Vector2(0.63, -1.6),
        new THREE.Vector2(0.69, -0.55),
        new THREE.Vector2(0.56, 0.05),
        new THREE.Vector2(0.65, 0.65),
        new THREE.Vector2(0.42, 1.08),
        new THREE.Vector2(0.0, 1.08),
      ];
      const liqGeo = new THREE.LatheGeometry(liqPoints, 48);
      liqGeo.scale(0.97, 1.0, 0.73);
      const liqMesh = new THREE.Mesh(liqGeo, liquidMat);
      liquidGroup.add(liqMesh);

      // Push-pull dosing cap
      const capBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.28, 32), capMat);
      capBase.position.y = 1.78;
      capGroup.add(capBase);

      const nozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.14, 0.24, 24),
        new THREE.MeshPhysicalMaterial({ color: '#FFFFFF', roughness: 0.2 })
      );
      nozzle.position.y = 2.0;
      capGroup.add(nozzle);

      // Label wrap
      const labelGeo = new THREE.CylinderGeometry(0.68, 0.74, 1.5, 48, 1, true, -Math.PI * 0.36, Math.PI * 0.72);
      labelGeo.scale(1.02, 1.0, 0.78);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.25;
      labelGroup.add(labelMesh);
    } else if (shape === 'industrial_jerrycan') {
      // Heavy-Duty 5L Industrial B2B Jerrycan
      const jerryShape = new THREE.Shape();
      const w = 1.05;
      const d = 0.68;
      const r = 0.22;
      jerryShape.moveTo(-w + r, -d);
      jerryShape.lineTo(w - r, -d);
      jerryShape.quadraticCurveTo(w, -d, w, -d + r);
      jerryShape.lineTo(w, d - r);
      jerryShape.quadraticCurveTo(w, d, w - r, d);
      jerryShape.lineTo(-w + r, d);
      jerryShape.quadraticCurveTo(-w, d, -w, d - r);
      jerryShape.lineTo(-w, -d + r);
      jerryShape.quadraticCurveTo(-w, -d, -w + r, -d);

      const extrudeGeo = new THREE.ExtrudeGeometry(jerryShape, {
        depth: 2.75,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 4,
        bevelSize: 0.12,
        bevelThickness: 0.16,
      });
      extrudeGeo.rotateX(Math.PI / 2);
      extrudeGeo.center();
      const canMesh = new THREE.Mesh(extrudeGeo, bottleMat);
      canMesh.position.y = -0.18;
      canMesh.castShadow = true;
      bodyGroup.add(canMesh);

      // Industrial top bridge handle
      const topHandle = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.24, 0.42), bottleMat);
      topHandle.position.set(0.32, 1.48, 0);
      bodyGroup.add(topHandle);

      const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.38, 0.45), bottleMat);
      pillarL.position.set(-0.12, 1.32, 0);
      bodyGroup.add(pillarL);

      const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.45), bottleMat);
      pillarR.position.set(0.76, 1.32, 0);
      bodyGroup.add(pillarR);

      // Neck & Tamper-evident Industrial Cap
      const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.32, 32), bottleMat);
      neckMesh.position.set(-0.58, 1.42, 0);
      bodyGroup.add(neckMesh);

      const indCap = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.34, 24), capMat);
      indCap.position.set(-0.58, 1.68, 0);
      capGroup.add(indCap);

      const safetyRing = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.035, 12, 32), capMat);
      safetyRing.rotation.x = Math.PI / 2;
      safetyRing.position.set(-0.58, 1.5, 0);
      capGroup.add(safetyRing);

      // Inner liquid block
      const liqBox = new THREE.Mesh(new THREE.BoxGeometry(1.88, 2.2, 1.18), liquidMat);
      liqBox.position.y = -0.32;
      liquidGroup.add(liqBox);

      // Large Flat Front Industrial Label
      const planeGeo = new THREE.PlaneGeometry(1.68, 1.92);
      const frontLabel = new THREE.Mesh(planeGeo, labelMat);
      frontLabel.position.set(0, -0.22, 0.815);
      labelGroup.add(frontLabel);
    } else if (shape === 'trigger_spray') {
      // 750ml Trigger Spray Bottle with visible internal dip tube
      const points = [
        new THREE.Vector2(0.0, -1.68),
        new THREE.Vector2(0.68, -1.68),
        new THREE.Vector2(0.74, -1.45),
        new THREE.Vector2(0.72, -0.25),
        new THREE.Vector2(0.54, 0.45),
        new THREE.Vector2(0.24, 1.15),
        new THREE.Vector2(0.22, 1.42),
      ];
      const latheGeo = new THREE.LatheGeometry(points, 56);
      latheGeo.scale(1.0, 1.0, 0.68);
      const bottleMesh = new THREE.Mesh(latheGeo, bottleMat);
      bodyGroup.add(bottleMesh);

      // Internal Dip Tube
      const tubeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.45, 0),
        new THREE.Vector3(0.02, 0.2, 0),
        new THREE.Vector3(0.18, -0.8, 0),
        new THREE.Vector3(0.45, -1.58, 0),
      ]);
      const dipTubeGeo = new THREE.TubeGeometry(tubeCurve, 24, 0.032, 12, false);
      const dipTubeMat = new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        transmission: 0.6,
        transparent: true,
        opacity: 0.75,
        roughness: 0.2,
      });
      const dipTube = new THREE.Mesh(dipTubeGeo, dipTubeMat);
      liquidGroup.add(dipTube);

      // Inner liquid
      const liqPoints = [
        new THREE.Vector2(0.0, -1.6),
        new THREE.Vector2(0.64, -1.6),
        new THREE.Vector2(0.67, -0.25),
        new THREE.Vector2(0.5, 0.35),
        new THREE.Vector2(0.0, 0.35),
      ];
      const liqGeo = new THREE.LatheGeometry(liqPoints, 48);
      liqGeo.scale(0.96, 1.0, 0.64);
      const liqMesh = new THREE.Mesh(liqGeo, liquidMat);
      liquidGroup.add(liqMesh);

      // Trigger Sprayer Head Assembly
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.24, 32), capMat);
      collar.position.y = 1.48;
      capGroup.add(collar);

      const shroud = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.34, 0.38),
        new THREE.MeshPhysicalMaterial({ color: '#F8FAFC', roughness: 0.2, clearcoat: 0.8 })
      );
      shroud.position.set(0.14, 1.75, 0);
      capGroup.add(shroud);

      // Rotary nozzle tip
      const nozzle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.24), capMat);
      nozzle.position.set(0.6, 1.75, 0);
      capGroup.add(nozzle);

      // Trigger lever
      const triggerCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.32, 1.62, 0),
        new THREE.Vector3(0.45, 1.32, 0),
        new THREE.Vector3(0.38, 1.02, 0),
      ]);
      const triggerGeo = new THREE.TubeGeometry(triggerCurve, 16, 0.055, 12, false);
      const triggerMesh = new THREE.Mesh(triggerGeo, capMat);
      capGroup.add(triggerMesh);

      // Curved label
      const labelGeo = new THREE.CylinderGeometry(0.66, 0.72, 1.36, 48, 1, true, -Math.PI * 0.35, Math.PI * 0.7);
      labelGeo.scale(1.02, 1.0, 0.7);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.45;
      labelGroup.add(labelMesh);
    } else if (shape === 'bleach_bottle') {
      // Heavy-Duty 2.5L Cylindrical Safety Bottle
      const points = [
        new THREE.Vector2(0.0, -1.68),
        new THREE.Vector2(0.84, -1.68),
        new THREE.Vector2(0.88, -1.45),
        new THREE.Vector2(0.88, 0.45),
        new THREE.Vector2(0.78, 0.65),
        new THREE.Vector2(0.85, 0.82), // structural ring
        new THREE.Vector2(0.48, 1.35),
        new THREE.Vector2(0.28, 1.55),
        new THREE.Vector2(0.28, 1.72),
      ];
      const latheGeo = new THREE.LatheGeometry(points, 64);
      const bottleMesh = new THREE.Mesh(latheGeo, bottleMat);
      bottleMesh.castShadow = true;
      bodyGroup.add(bottleMesh);

      // Side safety handle
      const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.62, 1.05, 0),
        new THREE.Vector3(1.14, 0.85, 0),
        new THREE.Vector3(1.14, 0.15, 0),
        new THREE.Vector3(0.82, -0.05, 0),
      ]);
      const handleGeo = new THREE.TubeGeometry(handleCurve, 28, 0.13, 16, false);
      const handleMesh = new THREE.Mesh(handleGeo, bottleMat);
      bodyGroup.add(handleMesh);

      // Child-lock safety cap
      const capMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.36, 32), capMat);
      capMesh.position.y = 1.82;
      capGroup.add(capMesh);

      // Liquid core
      const liqMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 2.1, 40), liquidMat);
      liqMesh.position.y = -0.5;
      liquidGroup.add(liqMesh);

      // Wrap label
      const labelGeo = new THREE.CylinderGeometry(0.895, 0.895, 1.65, 56, 1, true, -Math.PI * 0.38, Math.PI * 0.76);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.38;
      labelGroup.add(labelMesh);
    } else if (shape === 'soap_bar') {
      // Authentic 400g Savon de Ménage / Marseille Cube Bar with Embossed Seal
      const { map: stampMap, bumpMap: stampBump } = createSoapStampTexture(brandName);

      const soapShape = new THREE.Shape();
      const s = 0.98;
      const r = 0.16;
      soapShape.moveTo(-s + r, -s);
      soapShape.lineTo(s - r, -s);
      soapShape.quadraticCurveTo(s, -s, s, -s + r);
      soapShape.lineTo(s, s - r);
      soapShape.quadraticCurveTo(s, s, s - r, s);
      soapShape.lineTo(-s + r, s);
      soapShape.quadraticCurveTo(-s, s, -s, s - r);
      soapShape.lineTo(-s, -s + r);
      soapShape.quadraticCurveTo(-s, -s, -s + r, -s);

      const soapGeo = new THREE.ExtrudeGeometry(soapShape, {
        depth: 1.65,
        bevelEnabled: true,
        bevelSegments: 10,
        steps: 2,
        bevelSize: 0.12,
        bevelThickness: 0.12,
      });
      soapGeo.center();

      const soapMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(bottleColor),
        roughness: 0.38,
        metalness: 0.02,
        clearcoat: 0.18,
        clearcoatRoughness: 0.35,
        sheen: 0.35,
        sheenColor: new THREE.Color('#FFFBEB'),
        wireframe: wireframeMode,
      });

      const soapMesh = new THREE.Mesh(soapGeo, soapMat);
      soapMesh.castShadow = true;
      bodyGroup.add(soapMesh);

      // Front & Back Stamped Faces
      const stampMat = new THREE.MeshPhysicalMaterial({
        map: stampMap,
        bumpMap: stampBump,
        bumpScale: 0.045,
        roughness: 0.4,
        clearcoat: 0.15,
        wireframe: wireframeMode,
      });

      const frontFace = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 1.75), stampMat);
      frontFace.position.z = 0.955;
      labelGroup.add(frontFace);

      // Decorative kraft/gold belly band wrap (moves in exploded mode)
      const bandGeo = new THREE.BoxGeometry(2.24, 0.68, 1.98);
      const bandMesh = new THREE.Mesh(bandGeo, labelMat);
      bandMesh.position.y = -0.35;
      capGroup.add(bandMesh);
    } else if (shape === 'pump_bottle') {
      // 500ml Liquid Soap Dispenser Bottle with Pump
      const points = [
        new THREE.Vector2(0.0, -1.6),
        new THREE.Vector2(0.74, -1.6),
        new THREE.Vector2(0.82, -1.38),
        new THREE.Vector2(0.82, 0.55),
        new THREE.Vector2(0.68, 0.98),
        new THREE.Vector2(0.26, 1.25),
        new THREE.Vector2(0.26, 1.48),
      ];
      const latheGeo = new THREE.LatheGeometry(points, 64);
      const bottleMesh = new THREE.Mesh(latheGeo, bottleMat);
      bottleMesh.castShadow = true;
      bodyGroup.add(bottleMesh);

      // Internal Dip Tube + Liquid
      const dipTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 2.9, 16),
        new THREE.MeshPhysicalMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.65 })
      );
      dipTube.position.y = -0.05;
      liquidGroup.add(dipTube);

      const liqMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.95, 48), liquidMat);
      liqMesh.position.y = -0.52;
      liquidGroup.add(liqMesh);

      // Pump Dispenser Head
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.28, 32), capMat);
      collar.position.y = 1.54;
      capGroup.add(collar);

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.36, 24),
        new THREE.MeshPhysicalMaterial({ color: '#E2E8F0', metalness: 0.8, roughness: 0.2 })
      );
      stem.position.y = 1.82;
      capGroup.add(stem);

      const actuator = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.18, 0.28), capMat);
      actuator.position.set(0.22, 1.98, 0);
      capGroup.add(actuator);

      // Wrap label
      const labelGeo = new THREE.CylinderGeometry(0.835, 0.835, 1.55, 56, 1, true, -Math.PI * 0.38, Math.PI * 0.76);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.35;
      labelGroup.add(labelMesh);
    } else if (shape === 'powder_bucket') {
      // 10kg Industrial Detergent Powder Bucket
      const bucketGeo = new THREE.CylinderGeometry(1.18, 0.96, 2.45, 64);
      const bucketMesh = new THREE.Mesh(bucketGeo, bottleMat);
      bucketMesh.position.y = -0.22;
      bucketMesh.castShadow = true;
      bodyGroup.add(bucketMesh);

      // Upper reinforcement rim
      const rimGeo = new THREE.TorusGeometry(1.18, 0.055, 16, 64);
      const rimMesh = new THREE.Mesh(rimGeo, bottleMat);
      rimMesh.rotation.x = Math.PI / 2;
      rimMesh.position.y = 0.92;
      bodyGroup.add(rimMesh);

      // Hermetic Lid
      const lidGeo = new THREE.CylinderGeometry(1.23, 1.21, 0.22, 64);
      const lidMesh = new THREE.Mesh(lidGeo, capMat);
      lidMesh.position.y = 1.08;
      capGroup.add(lidMesh);

      // Metallic Bail Handle
      const bailCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.2, 0.88, 0),
        new THREE.Vector3(-1.35, 0.1, 0.85),
        new THREE.Vector3(0, -0.2, 1.28),
        new THREE.Vector3(1.35, 0.1, 0.85),
        new THREE.Vector3(1.2, 0.88, 0),
      ]);
      const bailGeo = new THREE.TubeGeometry(bailCurve, 36, 0.035, 12, false);
      const bailMat = new THREE.MeshPhysicalMaterial({ color: '#94A3B8', metalness: 0.9, roughness: 0.15 });
      const bailMesh = new THREE.Mesh(bailGeo, bailMat);
      bodyGroup.add(bailMesh);

      // Wrap-around tapered bucket label
      const labelGeo = new THREE.CylinderGeometry(1.14, 1.01, 1.72, 64, 1, true, -Math.PI * 0.42, Math.PI * 0.84);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.22;
      labelGroup.add(labelMesh);
    }

    // Floating Soap Bubbles / Active Surfactant Molecules
    const bubblesGroup = new THREE.Group();
    scene.add(bubblesGroup);

    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: '#FFFFFF',
      transmission: 0.95,
      transparent: true,
      opacity: 0.65,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.33,
      iridescence: 1.0,
      iridescenceIOR: 1.3,
      clearcoat: 1.0,
    });

    const bubbleData: { mesh: THREE.Mesh; speed: number; radius: number; angle: number; baseY: number }[] = [];
    for (let i = 0; i < 22; i++) {
      const r = 0.06 + (i % 5) * 0.038;
      const bGeo = new THREE.SphereGeometry(r, 24, 24);
      const bMesh = new THREE.Mesh(bGeo, i % 4 === 0 ? liquidMat : bubbleMat);
      const angle = (i / 22) * Math.PI * 2;
      const dist = 1.55 + (i % 3) * 0.45;
      const baseY = -1.4 + (i / 22) * 3.1;
      bMesh.position.set(Math.cos(angle) * dist, baseY, Math.sin(angle) * dist);
      bubblesGroup.add(bMesh);
      bubbleData.push({
        mesh: bMesh,
        speed: 0.4 + (i % 4) * 0.2,
        radius: dist,
        angle,
        baseY,
      });
    }

    // Interactive Pointer Orbit Controls
    let isPointerDown = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = -0.28;
    let targetRotX = 0.06;
    let currentRotY = -0.28;
    let currentRotX = 0.06;
    let targetZoom = 6.6;
    let currentZoom = 6.6;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      setIsDragging(true);
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetRotY += dx * 0.011;
      targetRotX = Math.max(-0.55, Math.min(0.65, targetRotX + dy * 0.008));
    };

    const onPointerUp = () => {
      isPointerDown = false;
      setIsDragging(false);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom = Math.max(4.5, Math.min(8.8, targetZoom + e.deltaY * 0.003));
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElem.addEventListener('wheel', onWheel, { passive: false });

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (autoRotateRef.current && !isPointerDown) {
        targetRotY += 0.0045;
      }

      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentZoom += (targetZoom - currentZoom) * 0.08;

      productRoot.rotation.y = currentRotY;
      productRoot.rotation.x = currentRotX;
      productRoot.position.y = Math.sin(elapsed * 1.6) * 0.06;

      camera.position.z = currentZoom;

      // Smooth Exploded View Animation
      const expTarget = explodedRef.current ? 1 : 0;
      capGroup.position.y += (expTarget * 0.68 - capGroup.position.y) * 0.08;
      labelGroup.position.z += (expTarget * 0.42 - labelGroup.position.z) * 0.08;
      liquidGroup.position.y += (expTarget * -0.22 - liquidGroup.position.y) * 0.08;

      // Bubbles animation
      bubblesGroup.visible = showBubblesRef.current;
      if (showBubblesRef.current) {
        bubbleData.forEach((b, idx) => {
          const a = b.angle + elapsed * 0.25 * b.speed;
          b.mesh.position.x = Math.cos(a) * b.radius;
          b.mesh.position.z = Math.sin(a) * b.radius;
          b.mesh.position.y = b.baseY + Math.sin(elapsed * 1.4 + idx) * 0.18;
        });
      }

      outerRingMesh.rotation.z = elapsed * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElem.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      labelTexture.dispose();
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [
    shape,
    bottleColor,
    capColor,
    liquidColor,
    labelAccent,
    labelTheme,
    bottleTranslucency,
    brandName,
    productTitle,
    productSubtitle,
    volumeText,
    badgeText,
    wireframeMode,
    studioPreset,
  ]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      title="Cliquez et glissez pour pivoter le modèle 3D à 360° • Molette pour zoomer"
    />
  );
}
