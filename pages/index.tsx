import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetServerSideProps } from 'next'
import { getAllPostsForHome } from '../lib/api'

export default function Home({
  preview,
  allPostsData
}: {
  preview: boolean,
  allPostsData: {
    date: string
    title: string
    slug: string
    excerpt: string
    coverImage: any
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Bound to get together</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
          {allPostsData.map(({ slug, date, title, excerpt, coverImage }) => (
            <div className="mb-4" key={slug}>
              <div className="flex flex-row">
                <img
                  src={coverImage.url}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />
                <div className="ml-4">
                  <Link href={`/posts/${slug}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightTextItalic}>
                    {excerpt}
                  </small>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </div>
              </div>
            </div>
          ))}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({preview = false}) => {
  const allPostsData = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPostsData },
  }
}