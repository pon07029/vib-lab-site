"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const DEFAULT_IMAGE = "/glass-image-study.png";
const HDR_ENVIRONMENT = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/royal_esplanade_2k.hdr";
const OBJECT_SCALE = 0.8;
const GLASS_OPACITY = 0.68;
const FOOTPRINT_SCALE = 0.7;
const DEPTH_SCALE = 1.5;
const PAPER_BACKGROUND = 0xf8f8f6;
const GLASS_ROUGHNESS = 0.015;

function GlassObjectCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(PAPER_BACKGROUND);
    let disposed = false;
    let environmentTexture: THREE.Texture | null = null;
    new RGBELoader().load(HDR_ENVIRONMENT, (loaded) => {
      if (disposed) {
        loaded.dispose();
        return;
      }
      loaded.mapping = THREE.EquirectangularReflectionMapping;
      loaded.minFilter = THREE.LinearFilter;
      loaded.magFilter = THREE.LinearFilter;
      environmentTexture = loaded;
      scene.environment = loaded;
      scene.environmentIntensity = 1.7;
    });
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;

    const group = new THREE.Group();
    group.scale.setScalar(OBJECT_SCALE);
    scene.add(group);
    scene.add(new THREE.HemisphereLight(0xf6f4ed, 0x18222e, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 6.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x78baff, 5.4);
    rimLight.position.set(-4, 1, -4);
    scene.add(rimLight);
    const frontRimLight = new THREE.DirectionalLight(0xcceeff, 3.8);
    frontRimLight.position.set(-2, 2, 6);
    scene.add(frontRimLight);

    const photoMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f1e7, roughness: 0.32, metalness: 0.08, side: THREE.DoubleSide });
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(2.3 * FOOTPRINT_SCALE, 2.3 * FOOTPRINT_SCALE), photoMaterial);
    group.add(photo);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeaf8ff,
      transmission: 1,
      roughness: GLASS_ROUGHNESS,
      metalness: 0,
      ior: 1.52,
      thickness: 1.05 * DEPTH_SCALE,
      attenuationColor: 0xcdefff,
      attenuationDistance: 2.4,
      envMapIntensity: 1.7,
      clearcoat: 1,
      clearcoatRoughness: 0,
      specularIntensity: 1,
      iridescence: 0.08,
      iridescenceIOR: 1.3,
      transparent: true,
      opacity: GLASS_OPACITY,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glass = new THREE.Mesh(new RoundedBoxGeometry(2.7 * FOOTPRINT_SCALE, 2.7 * FOOTPRINT_SCALE, 0.72 * DEPTH_SCALE, 12, 0.24), glassMaterial);
    glass.renderOrder = 2;
    group.add(glass);

    let texture: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();
    loader.load(DEFAULT_IMAGE, (loaded) => {
      texture = loaded;
      texture.colorSpace = THREE.SRGBColorSpace;
      photoMaterial.map = texture;
      photoMaterial.needsUpdate = true;
      const image = texture.image as { width?: number; height?: number } | undefined;
      const aspect = image?.width && image?.height ? image.width / image.height : 1;
      photo.scale.set(aspect > 1 ? 1 : aspect, aspect > 1 ? 1 / aspect : 1, 1);
    });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      camera.aspect = Math.max(1, width) / Math.max(1, height);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
    };

    let frameId = 0;
    let running = false;
    let visible = true;
    const clock = new THREE.Clock();
    const animate = () => {
      if (!running) return;
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      group.rotation.y = time * 0.32;
      group.rotation.x = Math.cos(time * 0.42) * 0.12;
      group.rotation.z = Math.sin(time * 0.28) * 0.05;
      controls.update();
      renderer.render(scene, camera);
    };
    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      clock.start();
      animate();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    resizeObserver?.observe(host);
    const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
      else stop();
    }, { rootMargin: "120px" });
    intersectionObserver?.observe(host);
    if (!intersectionObserver) start();

    return () => {
      disposed = true;
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      controls.dispose();
      photo.geometry.dispose();
      photoMaterial.dispose();
      glass.geometry.dispose();
      glassMaterial.dispose();
      texture?.dispose();
      environmentTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="glass-image-study__canvas" data-shape="square" data-scale={OBJECT_SCALE} data-zoom="fixed" data-environment="hdr" data-opacity={GLASS_OPACITY} data-finish="polished" data-roughness={GLASS_ROUGHNESS} data-visibility="enhanced" data-background="paper" data-image={DEFAULT_IMAGE} data-footprint={FOOTPRINT_SCALE} data-depth={DEPTH_SCALE} aria-hidden="true" />;
}

export function GlassImageStudy() {
  return (
    <div className="glass-image-study" role="region" aria-label="Glass image study">
      <GlassObjectCanvas />
      <div className="glass-image-study__header"><span>VIB / MATERIAL STUDY</span><span>DRAG TO INSPECT</span></div>
      <div className="glass-image-study__copy">
        <p className="eyebrow">GLASS IMAGE OBJECT</p>
        <h2>Memory,<br />reframed.</h2>
        <p>A single image sits inside a rotating square glass object. Drag to inspect its surface.</p>
      </div>
    </div>
  );
}
