"use client";

import { useEffect, useRef, useState } from "react";

import { Image, ImageProps } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

import { useCustomCursor } from "@/context/custom-cursor-context";

import { Text } from "./text";

export type CardProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  source?: string;
  github?: string;
};

export function Card({
  card,
  onClick,
  ...props
}: ImageProps & { card: CardProps; onClick?: () => void }) {
  const { setCursorText, setCursorVariant } = useCustomCursor();

  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);

  const { image } = card;

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
    setCursorText("view");
    setCursorVariant("project");

    document.body.style.cursor = "none";
  };

  const onPointerOut = () => {
    hover(false);
    setCursorText("drag");
    setCursorVariant("rotate");

    document.body.style.cursor = "auto";
  };

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

  return (
    // @ts-ignore
    <Image
      {...{
        ...props,
        ref,
        url: image,
        transparent: true,
        side: THREE.DoubleSide,
        onPointerOver,
        onPointerOut,
        onClick,
      }}
    >
      <Text
        font="/fonts/PPSupplyMono-Regular.json"
        position={[-0.65, -0.6, 0.1]}
        height={0.01}
        size={0.075}
      >
        {card.title}
      </Text>
      <bentPlaneGeometry args={[0.1, 1.5, 1, 20, 20]} />
    </Image>
  );
}
