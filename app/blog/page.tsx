import Link from 'next/link'
import { getAllPosts } from '../../lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cardiovascular Health Blog — Expert Tips & Guides | CardioGuard',
  description: 'Expert insights on advanced cardiovascular biomarkers, heart disease prevention, and cutting-edge testing for health-conscious entrepreneurs.',
  openGraph: {
    title: 'Cardiovascular Health Blog — Expert Tips & Guides | CardioGuard',
    description: 'Expert insights on advanced cardiovascular biomarkers, heart disease prevention, and cutting-edge testing for health-conscious entrepreneurs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardiovascular Health Blog — Expert Tips & Guides | CardioGuard',
    description: 'Expert insights on advanced cardiovascular biomarkers, heart disease prevention, and cutting-edge testing for health-conscious entrepreneurs.',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post')
  
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link 
            href="/" 
            className="text-primaryLight hover:text-primary transition-colors mb-4 inline-block"
          >
            ← Back to CardioGuard
          </Link>
          <h1 className="text-4xl font-bold mb-6">Cardiovascular Health Insights</h1>
          <p className="text-textSecondary text-lg leading-relaxed mb-2">
            Get the latest research on advanced cardiovascular biomarkers, heart disease prevention strategies, 
            and testing insights that matter for health-conscious professionals.
          </p>
          <p className="text-textSecondary leading-relaxed">
            Learn why traditional cholesterol testing misses critical risk factors and discover the advanced 
            markers that predict heart disease decades before symptoms appear.
          </p>
        </div>
        
        {posts.length === 0 ? (
          <div className="bg-backgroundElevated border border-border rounded-lg p-12 text-center">
            <h2 className="text-xl font-semibold mb-4 text-textSecondary">
              Coming Soon
            </h2>
            <p className="text-textMuted">
              We're preparing in-depth articles on advanced cardiovascular testing, 
              biomarker interpretation, and heart disease prevention strategies.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-backgroundElevated border border-border rounded-lg p-8 hover:border-primaryLight/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <time className="text-textMuted text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.targetKeywords && post.targetKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.targetKeywords.slice(0, 2).map((keyword) => (
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
                <h2 className="text-2xl font-semibold mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primaryLight transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-textSecondary leading-relaxed mb-4">
                  {post.description}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-primaryLight hover:text-primary font-medium transition-colors"
                >
                  Read Article →
                </Link>
              </article>
            ))}
          </div>
        )}
        
        <div className="mt-16 pt-8 border-t border-border">
          <nav className="flex flex-wrap gap-6 text-textMuted">
            <Link href="/" className="hover:text-primaryLight transition-colors">
              Home
            </Link>
            <Link href="/compare" className="hover:text-primaryLight transition-colors">
              Comparisons
            </Link>
            <Link href="/faq" className="hover:text-primaryLight transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}