import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import _ from "lodash";

import { Card, CardProps } from "./card-item";
import { Text } from "./text";
import "./bent-plane-geometry";

type CarouselProps = {
  cards: CardProps[];
  handleClick: (index: number) => void;
};

function Carousel({ cards, handleClick }: CarouselProps) {
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

type ModelProps = {
  active: number | undefined;
  setActive: (index: number | undefined) => void;
  cards: CardProps[];
};

const Model = ({ active, setActive, cards }: ModelProps) => {
  const Y_OFFSET = 0.25;

  const handleClick = _.throttle(
    (index: number) => {
      console.log("active", active);
      console.log("index", index);

      if (active === undefined) {
        setActive(index);
        return;
      }

      setActive(undefined);
    },
    500,
    { leading: true },
  );

  return (
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
        <Carousel cards={cards} handleClick={handleClick} />
      </group>
    </Canvas>
  );
};

export default Model;
