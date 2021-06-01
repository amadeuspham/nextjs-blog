import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostBySlug } from '../../lib/api'
import Date from '../../components/date'
import PostPhoto from '../../components/post-photo'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const postData = await getPostBySlug(params.slug as string, preview as boolean)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
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
