import { VeltProvider } from '@veltdev/react'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const init = async (client) => {

    if (client) {
      // To enable text comment feature
      const commentElement = client.getCommentElement();
      commentElement.enableTextComments(true);
      // Enable attachment feature
      commentElement.enableAttachment();
      // To enable live selection feature
      const selectionElement = client.getSelectionElement();
      // Show screen size info
      commentElement.enableDeviceInfo();
      selectionElement.enableLiveSelection();
      // Set document id
      client.setDocumentId(excludeVeltParamsFromUrl(window.location.href));
    }
  }

  const excludeVeltParamsFromUrl = (url) => {
    try {
      const tempUrl = new URL(url);
      ['review', 'sreviewId', 'snippyly-user', 'scommentId', 'stagId'].forEach((param) => {
        tempUrl.searchParams.delete(param);
      });
      return tempUrl.href;
    } catch (err) {
      return url;
    }
  }


  return (
    <VeltProvider apiKey='4ZkRt6W2Qr6zMuBk04hn'
      config={{
        // featureAllowList: ['presence', 'cursor'],
        // userIdAllowList: ['abcd'],
        // urlAllowList: [],
      }} onClientLoad={(client) => init(client)}>
      <Component {...pageProps} />
    </VeltProvider>
  )
}

export default MyApp
