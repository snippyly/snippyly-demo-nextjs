import '../../styles/globals.css'
import SnippylyWrapper from '../snippylyWrapper'

function MyApp({ Component, pageProps }) {
  return (
    <SnippylyWrapper>
      <Component {...pageProps} />
    </SnippylyWrapper>
  )
}

export default MyApp
