import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import {
  Image,
  ImageProps,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Canvas, GroupProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { VerticalLines } from "@/components/lines";
import { SectionTitle } from "@/components/text";
import { Button } from "@/components/ui/button";
import "@/utils/3d-carousel";

function Card({ url, ...props }: ImageProps & { url: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), hover(true)
  );
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    easing.damp3(ref.current!.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current!.material,
      "radius",
      hovered ? 0.25 : 0.1,
      0.2,
      delta,
    );
    easing.damp(ref.current!.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Carousel({ radius = 1.4, count = 8 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url="/images/info1.png"
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
}

function Rig(props: GroupProps) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (!ref.current || !state.events.update) return;

    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta,
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group {...props} ref={ref} />;
}

const Projects = () => {
  const numProjects = 10;
  const [activeSlide, setactiveSlide] = useState(0);

  const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);
  const next = () =>
    activeSlide < numProjects - 1 && setactiveSlide(activeSlide + 1);

  const renderFooter = () => (
    <div className="container mx-auto flex flex-col items-center gap-8 p-4 md:h-20 md:flex-row md:gap-0">
      <div className="hidden basis-1/4 md:block" />
      <div className="flex w-full flex-row justify-between md:w-auto md:basis-1/2 md:justify-around">
        <CrosshairIcon />
        <CrosshairIcon />
      </div>

      <div className="flex flex-row justify-center gap-12 md:basis-1/4 md:gap-4">
        <Button variant="outline" size="icon" onClick={prev}>
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={next}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <VerticalLines />
      <div className="container mx-auto mt-12">
        <SectionTitle text="projects" />
      </div>
      <div className="no-scrollbar relative flex grow flex-row items-center justify-center gap-8 overflow-x-scroll pt-8">
        <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
          <fog attach="fog" args={["#a79", 8.5, 12]} />
          <ScrollControls pages={4} infinite>
            <Rig rotation={[0, 0, 0.15]}>
              <Carousel />
            </Rig>
          </ScrollControls>
          {/* <Environment preset="city" background blur={0.5} /> */}
        </Canvas>
      </div>

      {renderFooter()}
    </>
  );
};

export default Projects;
