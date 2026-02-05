import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '../../../lib/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('faq')
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)
  
  if (!post) {
    return {
      title: 'FAQ Not Found | CardioGuard',
      description: 'The requested FAQ could not be found.'
    }
  }
  
  const title = `${post.title} | CardioGuard FAQ`
  
  return {
    title,
    description: post.description,
    openGraph: {
      title,
      description: post.description,
      type: 'article',
      url: `/faq/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
    },
    alternates: {
      canonical: `/faq/${slug}`,
    },
  }
}

function FAQJsonLd({ post }: { post: any }) {
  // Extract Q&A pairs from the HTML content
  // This is a simple extraction - in a real app, you might want more sophisticated parsing
  const questions = []
  const content = post.content
  
  // Basic extraction of H2/H3 questions and following paragraphs
  const questionMatches = content.match(/<h[23][^>]*>([^<]+)<\/h[23]>\s*<p>([^<]+)<\/p>/gi)
  
  if (questionMatches) {
    for (const match of questionMatches) {
      const questionMatch = match.match(/<h[23][^>]*>([^<]+)<\/h[23]>/)
      const answerMatch = match.match(/<p>([^<]+)<\/p>/)
      
      if (questionMatch && answerMatch) {
        questions.push({
          '@type': 'Question',
          name: questionMatch[1],
          acceptedAnswer: {
            '@type': 'Answer',
            text: answerMatch[1]
          }
        })
      }
    }
  }
  
  // Fallback if no structured Q&A found
  if (questions.length === 0) {
    questions.push({
      '@type': 'Question',
      name: post.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: post.description
      }
    })
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function FAQPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <>
      <FAQJsonLd post={post} />
      <div className="min-h-screen bg-background text-textPrimary">
        <article className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Link 
              href="/" 
              className="text-primaryLight hover:text-primary transition-colors mb-6 inline-block"
            >
              ← Back to CardioGuard
            </Link>
            <div className="flex items-center justify-between mb-6">
              <time className="text-textMuted">
                Updated {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.targetKeywords && post.targetKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.targetKeywords.slice(0, 3).map((keyword) => (
                    <span 
                      key={keyword}
                      className="text-xs px-2 py-1 bg-primary/10 text-primaryLight rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-textSecondary leading-relaxed">
              {post.description}
            </p>
          </div>
          
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <Link 
                href="/" 
                className="text-primaryLight hover:text-primary transition-colors"
              >
                ← Back to Home
              </Link>
              <Link 
                href="/" 
                className="bg-primary hover:bg-primaryLight text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Get Advanced Testing
              </Link>
            </div>
            
            <nav className="flex flex-wrap gap-6 text-textMuted mt-8">
              <Link href="/" className="hover:text-primaryLight transition-colors">
                Home
              </Link>
              <Link href="/blog" className="hover:text-primaryLight transition-colors">
                Blog
              </Link>
              <Link href="/compare" className="hover:text-primaryLight transition-colors">
                Comparisons
              </Link>
            </nav>
          </div>
        </article>
      </div>
    </>
  )
}