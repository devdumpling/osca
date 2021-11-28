import Meta from "../components/Meta";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

const Index = () => {
  return (
    <>
      <Meta title="OSCA | Oberlin Student Cooperative Association" />
      <Header />
      <Container>
        <Hero />
        <Footer />
        <CTA />
      </Container>
    </>
  );
};

export default Index;
