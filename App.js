import React from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import map from './assets/envmap.hdr'

export default function App() {
  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        // Setup Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 1); // Black background

        // Lighting
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);

        // Load Environment Map for Reflection
        const hdrAsset = Asset.fromModule(map); // Add an HDRI map
        await hdrAsset.downloadAsync();

        new RGBELoader().load(hdrAsset.localUri, (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
        });

        // Create a Sphere
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 1,
          roughness: 0,
          transmission: 0.9, // Glass-like effect
          clearcoat: 1,
          clearcoatRoughness: 0,
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Animation Loop
        const animate = () => {
          requestAnimationFrame(animate);
          sphere.rotation.y += 0.01;
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };

        animate();
      }}
    />
  );
}
