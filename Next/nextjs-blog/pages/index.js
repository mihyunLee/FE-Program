import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, there! I'm MihyunLee. I'm a prepare to web front-end developer.{" "}
          <br />
          Now, I'm practicing <a href="https://nextjs.org">Next.js</a> ❤
        </p>
      </section>
    </Layout>
  );
}
