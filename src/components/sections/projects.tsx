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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AnimatePresence, motion } from "motion/react";

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
    title: "Financial Dashboard",
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

function Card({
  card,
  onClick,
  ...props
}: ImageProps & { card: CardItem; onClick?: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);

  const { url } = card;

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), hover(true)
  );
  const onPointerOut = () => hover(false);

  useFrame((state, delta) => {
    easing.damp3(ref.current!.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current!.material,
      "radius",
      hovered ? 0.1 : 0.05,
      0.2,
      delta,
    );
    easing.damp(ref.current!.material, "zoom", hovered ? 0.7 : 0.9, 0.2, delta);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    // @ts-ignore
    <Image
      {...{
        ...props,
        ref,
        url,
        transparent: true,
        side: THREE.DoubleSide,
        onPointerOver,
        onPointerOut,
        onClick,
      }}
    >
      <Text3D
        font="/fonts/PPSupplyMono-Regular.json"
        position={[-0.65, -0.6, 0.05]}
        height={0.01}
        size={0.075}
      >
        {card.title}
      </Text3D>
      <bentPlaneGeometry args={[0.1, 1.5, 1, 20, 20]} />
    </Image>
  );
}

function Carousel({
  cards,
  handleClick,
}: {
  cards: CardItem[];
  handleClick: (index: number) => void;
}) {
  const count = cards.length;
  const radius = (count * 2.5) / (Math.PI * 2);

  return cards.map((card, i) => (
    // @ts-ignore
    <Card
      key={i}
      card={card}
      onClick={() => handleClick(i)}
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
  const Y_OFFSET = 0.25;
  const [active, setActive] = useState<number | undefined>(undefined);
  const project = active !== undefined ? projectCards[active] : undefined;

  const handleClick = (index: number) => {
    console.log("clicked on", index);
    if (active === undefined) {
      setActive(index);
      return;
    }

    setActive(undefined);
  };

  // const prev = () =>
  //   setActive(active > 0 ? active - 1 : numProjects - 1);
  // const next = () =>
  //   setActive(active < numProjects - 1 ? active + 1 : 0);

  const renderFooter = () => (
    <div className="container mx-auto flex flex-col items-center gap-8 p-4 md:h-20 md:flex-row md:gap-0">
      <div className="hidden basis-1/4 md:block" />
      <div className="flex w-full flex-row justify-between md:w-auto md:basis-1/2 md:justify-around">
        <CrosshairIcon />
        <CrosshairIcon />
      </div>

      {/* <div className="flex flex-row justify-center gap-12 md:basis-1/4 md:gap-4">
        <Button variant="outline" size="icon" onClick={prev}>
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={next}>
          <ArrowRight />
        </Button>
      </div> */}
    </div>
  );

  console.log(project);

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
          position={[-1, 1.75 - Y_OFFSET, 0]}
          height={0.01}
        >
          projects
        </Text>

        <mesh position={[0, -Y_OFFSET, 0]}>
          <sphereGeometry args={[0.9, 20, 20]} />
          <meshBasicMaterial wireframe color="white" />
        </mesh>

        <group rotation={[0, 0, 0.1]} position={[0, -Y_OFFSET, 0]}>
          <Carousel cards={projectCards} handleClick={handleClick} />
        </group>
      </Canvas>

      <Dialog
        open={active !== undefined}
        onOpenChange={() => setActive(undefined)}
      >
        <DialogContent className="">
          <AnimatePresence>
            <motion.div
              key={active}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { y: "50vh" },
                animate: {
                  y: ["50vh", "-25vh", "-25vh", 0],
                  rotateY: [-720, 0, 0, 0],
                },
                exit: { y: "50vh" },
              }}
              transition={{
                type: "keyframes",
                duration: 3,
                timings: [0, 0.94, 0.98, 1],
              }}
              className="fixed left-0 top-[50%] z-50 grid h-96 w-full max-w-lg translate-x-[50%] translate-y-[50%] gap-4 border bg-[var(--background)] p-6 shadow-lg sm:rounded-lg"
            >
              <DialogHeader>
                <DialogTitle>{project?.title}</DialogTitle>
                <DialogDescription>{project?.description}</DialogDescription>
              </DialogHeader>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {renderFooter()}
    </>
  );
};

export default Projects;
