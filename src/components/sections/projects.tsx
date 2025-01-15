import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Image, ImageProps, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { VerticalLines } from "@/components/lines";
import { Button } from "@/components/ui/button";
import "@/utils/3d-carousel";

type CardItem = {
  url: string;
  title: string;
  description: string;
  stack: string[];
  link: string;
};

const projectCards: CardItem[] = [
  {
    url: "/projects/blockchange-img.png",
    title: "BlockChange",
    description: "A distributed crowdfunding platform for social causes",
    stack: ["Next.js", "Solidity"],
    link: "",
  },
  {
    url: "/projects/financial-dashboard-img.png",
    title: "Mock Financial Dashboard",
    description:
      "A mock financial dashboard with charts and graphs and a grid layout",
    stack: ["Next.js", "Material-UI"],
    link: "",
  },
  {
    url: "/projects/gradguru.png",
    title: "Gradguru",
    description:
      "Gradguru is a platform that helps students navigate the application process for graduate programs",
    stack: ["Next.js", "Firebase", "Material-UI"],
    link: "",
  },
  {
    url: "/projects/lunaocean-img.png",
    title: "lunaocean",
    description: "An art portfolio website commissioned by an upcoming artist",
    stack: ["Next.js", "Tailwind CSS"],
    link: "",
  },
  {
    url: "/projects/matrix-effect.png",
    title: "Matrix Effect",
    description: "A JavaScript based Matrix Screen effect using HTML5 Canvas",
    stack: [],
    link: "",
  },
];

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

function Card({ card, ...props }: ImageProps & { card: CardItem }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);

  const { url } = card;

  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), hover(true)
  );
  const pointerOut = () => hover(false);

  useFrame((state, delta) => {
    easing.damp3(ref.current!.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current!.material,
      "radius",
      hovered ? 0.1 : 0.05,
      0.2,
      delta,
    );
    easing.damp(ref.current!.material, "zoom", hovered ? 1.1 : 0.9, 0.2, delta);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    // @ts-ignore
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1.5, 1, 20, 20]} />
    </Image>
  );
}

function Carousel({ cards }: { cards: CardItem[] }) {
  const count = cards.length;
  const radius = (count * 2.5) / (Math.PI * 2);

  return cards.map((card, i) => (
    // @ts-ignore
    <Card
      key={i}
      card={card}
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
          autoRotate
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
          <Carousel cards={projectCards} />
        </group>
      </Canvas>

      {renderFooter()}
    </>
  );
};

export default Projects;
