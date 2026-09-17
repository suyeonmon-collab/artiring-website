'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_CAMERA_ORBIT = '28deg 86deg 108%';
const SHADOW_INTENSITY = 0.9;
const SHADOW_SOFTNESS = 0.55;

function applyMatteMaterials(viewer) {
  viewer.model?.materials?.forEach((material) => {
    const pbr = material.pbrMetallicRoughness;
    if (!pbr) return;
    pbr.setMetallicFactor(0);
    pbr.setRoughnessFactor(1);
  });
}

function applyShadowSettings(viewer) {
  viewer.shadowIntensity = SHADOW_INTENSITY;
  viewer.shadowSoftness = SHADOW_SOFTNESS;
}

export default function CharacterModelViewer({
  src,
  alt,
  cameraOrbit = DEFAULT_CAMERA_ORBIT,
  className = 'w-64 h-64',
  loadingClassName = '',
}) {
  const [ready, setReady] = useState(false);
  const viewerRef = useRef(null);

  useEffect(() => {
    import('@google/model-viewer').then(() => setReady(true));
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!ready || !viewer) return;

    const onLoad = () => {
      applyMatteMaterials(viewer);
      applyShadowSettings(viewer);
      viewer.cameraOrbit = cameraOrbit;
      viewer.orientation = '0deg 0deg 0deg';
      viewer.jumpCameraToGoal();
    };

    viewer.addEventListener('load', onLoad);
    if (viewer.loaded) onLoad();

    return () => viewer.removeEventListener('load', onLoad);
  }, [ready, cameraOrbit, src]);

  if (!ready) {
    return (
      <div
        className={`rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-secondary-yellow-light)] animate-pulse ${className} ${loadingClassName}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <model-viewer
        key={src}
        ref={viewerRef}
        src={src}
        alt={alt}
        autoplay
        auto-rotate={false}
        camera-controls={false}
        disable-pan
        disable-zoom
        disable-tap
        interaction-prompt="none"
        shadow-intensity={String(SHADOW_INTENSITY)}
        shadow-softness={String(SHADOW_SOFTNESS)}
        exposure="0.95"
        camera-orbit={cameraOrbit}
        min-camera-orbit={cameraOrbit}
        max-camera-orbit={cameraOrbit}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          '--poster-color': 'transparent',
        }}
      />
    </div>
  );
}
