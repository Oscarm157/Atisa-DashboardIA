import { OnboardingDeck } from "./OnboardingDeck";
import { slides } from "./slides";

export const metadata = {
  title: "Onboarding Claude · Atisa",
  description:
    "Sesión de onboarding del equipo Atisa: qué es Claude, cómo se le habla y qué hacer el mismo día.",
};

export default function OnboardingClaudePage() {
  return <OnboardingDeck slides={slides} />;
}
