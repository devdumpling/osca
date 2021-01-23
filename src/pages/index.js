import Meta from '../components/Meta'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import About from '../components/About'
import Header from '../components/Header'

const Index = ({ file = {} }) => {
  // Form Options for TinaCMS
  const formOptions = {
    label: 'About',
    fields: [{ name: 'title', component: 'text' }, { name: 'body', component: 'markdown' }],
  }
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  return (
    <>
      <Meta />
      <Header />
      <Container>
        <Hero />
        <Main>
          <About form={form} data={data} />
        </Main>
        <Footer />
        <CTA />
      </Container>
    </>
  )
}

export default Index

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export async function getStaticProps({ preview, previewData }) {
  if (preview) {
    // todo: deal with uninformative page breaking error if JSON file is missing
    try {
      return await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'src/content/index.json',
        parse: parseJson,
        head_branch: process.env.NEXT_PUBLIC_BASE_BRANCH
      })
    } catch (error) {
      return { props: { error } }
    }
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/index.json',
        data: (await import('../content/index.json')).default
      }
    }
  }
}
