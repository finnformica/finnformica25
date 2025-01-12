import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import { Html, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, GroupProps, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { VerticalLines } from "@/components/lines";
import { SectionTitle } from "@/components/text";
import { Button } from "@/components/ui/button";
import "@/utils/3d-carousel";
import Image from "next/image";

const Text = ({ children, font, ...props }: any) => (
  <Text3D
    font={font ? font : "/fonts/PPSupplyMono-Regular.json"}
    bevelEnabled={false}
    bevelSize={0}
    height={0}
    size={0.1}
    {...props}
  >
    {children}
  </Text3D>
);

function Card(props: GroupProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, hover] = useState(false);

  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), hover(true)
  );
  const pointerOut = () => hover(false);

  // useFrame((state, delta) => {
  //   easing.damp3(ref.current!.scale, hovered ? 1.15 : 1, 0.1, delta);
  //   easing.damp(
  //     ref.current!.material,
  //     "radius",
  //     hovered ? 0.25 : 0.1,
  //     0.2,
  //     delta,
  //   );
  //   easing.damp(ref.current!.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  // });

  return (
    <group
      ref={ref}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      {/* <Text position={[0.0, -0.677, 0.01]}>Finn Formica</Text> */}
      {/* <Text position={[-0.375, 0.715, 0.01]}>pickles</Text> */}
      {/* <Text position={[-0.375, -0.677, 0.01]}>/94</Text> */}

      <Html transform scale={0.1} occlude="blending">
        <div className="prevent-select relative flex aspect-[3/4] h-96 flex-col rounded-lg bg-[var(--background-light)] p-1 transition-all hover:drop-shadow-white">
          <h4>BlockChange</h4>
          <Image
            alt="Project BlockChange Image"
            src="/projects/blockchange-img.png"
            layout="fill"
            objectFit="contain"
            className="pointer-events-none"
            draggable="false"
          />
          <p className="grow">
            Dolor pariatur exercitation non in in. Dolore magna excepteur
            laborum sit dolore adipisicing. In amet nisi aliquip nulla sunt
            commodo ipsum officia laboris id reprehenderit Lorem duis ea. Et
            consectetur deserunt commodo veniam.
          </p>

          <div className="flex flex-row gap-2">
            {["GitHub", "Source"].map((text) => (
              <p
                key={text}
                className="rounded-full border-1 border-[var(--foreground)] px-3 py-1 text-xs"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </Html>

      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </group>
  );
}

function Carousel({ count = 8 }) {
  const radius = (count * 1.6) / (Math.PI * 2);

  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, (i / count) * Math.PI * 2, 0]}
    />
  ));
}

const Projects = () => {
  const numProjects = 10;
  const [activeSlide, setactiveSlide] = useState(0);

  const prev = () =>
    setactiveSlide(activeSlide > 0 ? activeSlide - 1 : numProjects - 1);
  const next = () =>
    setactiveSlide(activeSlide < numProjects - 1 ? activeSlide + 1 : 0);

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
      {/* <div className="container mx-auto mt-12">
        <SectionTitle text="projects" />
      </div> */}
      <Canvas camera={{ position: [0, 0, 4] }}>
        <OrbitControls
          makeDefault
          enableZoom={false}
          // autoRotate
          autoRotateSpeed={0.75}
          enableDamping
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />

        <Text
          font="/fonts/MADE Outer Sans Alt_Black.json"
          scale={2}
          position={[-1, 2, 0]}
          height={0.01}
        >
          projects
        </Text>

        <mesh>
          <sphereGeometry args={[0.9, 20, 20]} />
          <meshBasicMaterial wireframe color="white" />
        </mesh>

        <group rotation={[0, 0, 0.1]}>
          <Carousel count={numProjects} />
        </group>
      </Canvas>

      {renderFooter()}
    </>
  );
};

export default Projects;
