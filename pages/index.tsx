import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
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
        <ul className={utilStyles.list}>
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <li className={utilStyles.listItem} key={slug}>
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
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

type GetStaticPropsParams = {
	preview: boolean
}

export const getStaticProps: GetStaticProps = async ({preview = false}: GetStaticPropsParams) => {
  const allPostsData = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPostsData },
  }
}