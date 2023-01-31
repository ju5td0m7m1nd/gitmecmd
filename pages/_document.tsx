import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate the git command you need using ChatGPT."
          />
          <meta property="og:site_name" content="gitmecmd.xyz" />
          <meta
            property="og:description"
            content="Generate the git command you need using ChatGPT."
          />
          <meta property="og:title" content="Git Me Cmd" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Git Me Cmd" />
          <meta
            name="twitter:description"
            content="Generate the git command you need using ChatGPT."
          />
          <meta
            property="og:image"
            content="https://gitmecmd.xyz/api/ogImage"
          />
          <meta
            name="twitter:image"
            content="https://gitmecmd.xyz/api/ogImage"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
