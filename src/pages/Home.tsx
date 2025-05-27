import HeroIndex from "../components/home/HeroIndex";
import Features from "../components/home/Features";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function Home() {
  return (
    <div>
      {/* Hero Section with Video Background */}
      <HeroIndex />
      {/* Features Section */}
      <Features staggerContainer={staggerContainer} fadeIn={fadeIn} />
    </div>
  );
}
