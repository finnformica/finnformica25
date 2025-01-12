import { Object3DNode, ThreeElements } from "@react-three/fiber";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    bentPlaneGeometry: Object3DNode<
      BentPlaneGeometry,
      typeof BentPlaneGeometry
    >;
    meshSineMaterial: Object3DNode<MeshSineMateriaa, typeof MeshSineMaterial>;
  }
}
