import { SlidesDeck } from "./SlidesDeck";
import { SLIDES } from "./slides";

export const metadata = {
  title: "Sesión 1 · Básico · Atisa 2026",
};

export default function Sesion1BasicoPage() {
  return <SlidesDeck slides={SLIDES} />;
}
