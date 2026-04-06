/**
 * Illustrations JUNO — formes 3D pour les cards d'étapes
 * Fichiers PNG dans /public/illustrations/
 *
 * Usage :
 *   import Image from "next/image";
 *   import { illustrations } from "@/lib/illustrations";
 *
 *   <Image src={illustrations.spiral} alt="Spirale" width={120} height={120} />
 *   <Image src={illustrations.ball} alt="Balle" width={80} height={80} />
 */

export const illustrations = {
  ball:          "/illustrations/Ball.png",
  ball2:         "/illustrations/Ball-2.png",
  cone:          "/illustrations/Cone.png",
  cones:         "/illustrations/Cones.png",
  cones2:        "/illustrations/Cones-2-metallic.png",
  cube:          "/illustrations/Cube.png",
  cube2:         "/illustrations/Cube-2.png",
  cylinder:      "/illustrations/Cylinder.png",
  glass:         "/illustrations/Glass.png",
  glasses:       "/illustrations/Glasses.png",
  polyhedron:    "/illustrations/Polyhedron.png",
  spiral:        "/illustrations/Spiral.png",
  spiral2:       "/illustrations/Spiral-2.png",
  torus:         "/illustrations/Torus.png",
  torus2:        "/illustrations/Torus-2.png",
  wands:         "/illustrations/Wands.png",
} as const;

export type IllustrationKey = keyof typeof illustrations;
