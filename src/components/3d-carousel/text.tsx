import { Text3D } from "@react-three/drei";

type TextProps = any & {
  children: React.ReactNode;
  font?: string;
};

export const Text = ({ children, font, ...props }: TextProps) => (
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
