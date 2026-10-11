import { notFound } from "next/navigation";

import ArticleHero from "@/components/blog/ArticleHero";
import ArticleBody from "@/components/blog/ArticleBody";
import RelatedArticles from "@/components/blog/RelatedArticles";
import BlogPostAdmin from "@/components/cms/BlogPostAdmin";
import CmsSection from "@/components/cms/CmsSection";
import DynamicPageAdmin from "@/components/dynamic/DynamicPageAdmin";
import DynamicPageRenderer from "@/components/dynamic/DynamicPageRenderer";
import PageSeo from "@/components/seo/PageSeo";

import { articlesFrom, localArticle, postToArticle } from "@/lib/blog";
import { getBlogPost, getBlogPosts, getBlogSections } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";


// CMS post first. The built-in articles are only used while the CMS has
// no posts at all (not seeded yet, or unreachable).
async function loadArticle(slug) {

    const post = await getBlogPost(slug);

    if (post) {
        return { post, article: postToArticle(post) };
    }

    const posts = await getBlogPosts();

    if (!posts || posts.length === 0) {
        const article = localArticle(slug);
        return article ? { post: null, article } : null;
    }

    return null;

}



export async function generateMetadata({ params }) {

    const { slug } = await params;

    const found = await loadArticle(slug);


    if (!found) {

        return {
            title: { absolute: "Article Not Found | ZFK Accountants" },
            robots: { index: false, follow: true }
        };

    }


    const { article } = found;

    return pageMetadata(`/blog/${slug}`, {

        title: `${article.title} | ZFK Accountants`,

        description: article.description,

        openGraph: {
            type: "article",
            publishedTime: article.publishedAt || undefined,
            modifiedTime: article.updatedAt || undefined,
            authors: [article.author],
            section: article.category,
        },

    });

}



export default async function BlogArticle({ params }) {


    const { slug } = await params;


    const found = await loadArticle(slug);


    if (!found) {

        notFound();

    }


    const { post, article } = found;

    const [posts, sections] = await Promise.all([
        getBlogPosts(),
        post?.body_mode === "dynamic" ? getBlogSections(slug) : Promise.resolve([]),
    ]);

    const articles = articlesFrom(posts);


    return (

        <CmsSection shared names={["blog-template"]}>

            <ArticleHero
                article={article}
            />


            {post?.body_mode === "dynamic" ? (

                <DynamicPageAdmin kind="blog" hostKey={slug}>
                    <DynamicPageRenderer sections={sections} />
                </DynamicPageAdmin>

            ) : (

                <ArticleBody
                    article={article}
                />

            )}

            <RelatedArticles

                article={article}

                articles={articles}

            />


            <BlogPostAdmin post={post} />

            <PageSeo path={`/blog/${slug}`} />

        </CmsSection>

    );

}
