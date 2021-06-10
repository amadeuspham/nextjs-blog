import Layout from '../../components/layout'
import { getPostBySlug } from '../../lib/api'
import Date from '../../components/date'
import PostPhoto from '../../components/post-photo'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { GetServerSideProps } from 'next'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const getServerSideProps: GetServerSideProps = async ({ params, preview = false }) => {
  const postData = await getPostBySlug(params.slug as string, preview as boolean)

  if (!postData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      postData
    }
  }
}

export default function Post({
  postData
}: {
  postData: {
    slug: string
    title: string
    date: string
    content: any
    coverImage: any
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <PostPhoto title={postData.title} url={postData.coverImage.url} slug={postData.slug}/>
        {documentToReactComponents(postData.content.json)}
      </article>
    </Layout>
  )
}
