// ImageViewer.jsx
import React, { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TourContext from "./TourContext";
import FullscreenToggle from "./FullscreenToggle";
import HotspotOverlay from "./HotspotOverlay";
import { Box } from "@mui/material";

const ImageViewer = () => {
  const containerRef = useRef();
  const { selectedImage } = useContext(TourContext);

  useEffect(() => {
    if (!selectedImage || !containerRef.current) return;
    let renderer, scene, camera, controls, sphere;

    // Set up scene
    scene = new THREE.Scene();
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Camera positioned at sphere center
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    camera.position.set(0, 0, 0.1);

    // Sphere geometry (inverted)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // Load texture and create mesh
    const loader = new THREE.TextureLoader();
    loader.load(selectedImage, (texture) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      // Render initial frame after texture loads
      renderer.render(scene, camera);
    });

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // OrbitControls for user interaction
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Handle window resize
    const handleResize = () => {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount or image change
    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement)
        containerRef.current.removeChild(renderer.domElement);
      controls.dispose();
      geometry.dispose();
      if (sphere && sphere.material.map) sphere.material.map.dispose();
      if (sphere && sphere.material) sphere.material.dispose();
      renderer.dispose();
    };
  }, [selectedImage]);

  return (
    <Box sx={{ position: "relative", flex: 1 }}>
      {/* Div for Three.js canvas */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {/* Fullscreen button overlaid */}
      <FullscreenToggle containerRef={containerRef} />
      {/* Example hotspot overlay */}
      <HotspotOverlay />
    </Box>
  );
};

export default ImageViewer;
