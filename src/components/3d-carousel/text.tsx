import { getRootStyle } from "@/lib/utils";
import { FontData, Text3D } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { TextGeometryParameters } from "three-stdlib";

// Type copied from Text3D.d.ts
type Text3DProps = {
  font: FontData | string;
  bevelSegments?: number;
  smooth?: number;
} & Omit<TextGeometryParameters, "font"> &
  MeshProps;

type TextProps = Text3DProps & {
  children: React.ReactNode;
  font?: string;
};

export const Text = ({ children, font, ...props }: TextProps) => {
  const foregroundColor = getRootStyle("--foreground");

  return (
    <Text3D
      font={font ? font : "/fonts/PPSupplyMono-Regular.json"}
      bevelEnabled={false}
      bevelSize={0}
      height={0}
      size={0.1}
      {...props}
    >
      {children}
      <meshBasicMaterial color={foregroundColor} />
    </Text3D>
  );
};
