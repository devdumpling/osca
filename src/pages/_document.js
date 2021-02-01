import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../theme'

export default class Document extends NextDocument {
  render () {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
          <style jsx global>{`
            * {
              scroll-margin-top: 5rem;
            }
          `}
          </style>
          <script
            src="https://browser.sentry-cdn.com/6.0.2/bundle.min.js"
            integrity="sha384-mPF153CKKRhOGUecfj8Bo9gMzP/39GkWXC498PTR2t9NU6SRnQQpCM2b3hiUTsEo"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    )
  }
}
