import Meta from "../components/Meta";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { fetchAPI } from "../lib/strapi/api";

const Index = (props) => {
  const { home } = props;

  return (
    <>
      <Meta title="OSCA | Oberlin Student Cooperative Association" />
      <Header />
      <Container>
        <Hero title={home?.heroTitle} subtitle={home?.heroSubtitle} />
        <Footer />
        <CTA />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [pages, home] = await Promise.all([
    fetchAPI("/pages"),
    fetchAPI("/home"),
  ]);

  return {
    props: {
      pages,
      home,
    },
    revalidate: 1,
  };
}

export default Index;
