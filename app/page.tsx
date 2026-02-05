'use client'

import { useState } from 'react'
import JsonLd from '@/components/content/JsonLd'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess(true)
        setEmail('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const faqs = [
    {
      question: "What are the best markers for cardiovascular health?",
      answer: "ApoB (apolipoprotein B) is now considered the gold standard for predicting heart disease risk, showing 3x better accuracy than basic LDL cholesterol. Lipoprotein(a) testing reveals genetic risk factors that 20% of people carry unknowingly."
    },
    {
      question: "What is a preferred cardiac biomarker?",
      answer: "Leading cardiologists now prioritize ApoB over LDL cholesterol because it counts actual atherogenic particles, not just cholesterol content. hs-CRP (high-sensitivity C-reactive protein) adds crucial inflammation data that standard panels miss entirely."
    },
    {
      question: "Does insurance cover LP(a) test?", 
      answer: "Most insurance plans still deny Lp(a) testing coverage, calling it 'experimental' despite decades of research proving its importance. This forces health-conscious individuals to pay out-of-pocket or skip this critical genetic risk assessment."
    },
    {
      question: "What tests are not covered by insurance?",
      answer: "Insurance typically denies advanced cardiovascular markers like ApoB, Lp(a), particle size analysis, and comprehensive inflammatory panels. These 'next-generation' tests often require lengthy prior authorization battles or direct payment."
    }
  )

  const organizationSchema = {
    "@type": "Organization",
    "name": "CardioGuard",
    "url": "https://cardioguard.com",
    "description": "Advanced heart testing without insurance barriers for entrepreneurs and health-conscious professionals",
    "sameAs": [
      "https://twitter.com/cardioguard"
    ]
  }

  const websiteSchema = {
    "@type": "WebSite",
    "name": "CardioGuard",
    "url": "https://cardioguard.com",
    "description": "Advanced Heart Testing Without Insurance Barriers",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://cardioguard.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={faqSchema} />
      
      <header className="bg-backgroundElevated border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-textPrimary">CardioGuard</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/blog" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">Heart Health Blog</a>
                <a href="/compare" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">Compare Tests</a>
                <a href="/faq" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">FAQ</a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative py-20 lg:py-32" aria-label="Hero section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-textPrimary leading-tight mb-6">
                Best Cardiovascular Biomarkers for Entrepreneurs Who Won't Wait for Insurance
              </h1>
              <p className="text-xl md:text-2xl text-textSecondary max-w-4xl mx-auto mb-10 leading-relaxed">
                Access ApoB, Lp(a), and advanced lipid testing that predicts heart disease better than basic cholesterol—without physician gatekeeping or coverage battles.
              </p>
              
              <div className="max-w-md mx-auto">
                {success ? (
                  <div className="bg-primaryLight/10 border border-primaryLight/20 rounded-lg p-6">
                    <p className="text-primaryLight font-medium">Thanks! You're on the list for early access.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 bg-backgroundElevated border border-border rounded-lg text-textPrimary placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-primary hover:bg-primaryLight disabled:opacity-50 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      {loading ? 'Joining...' : 'Get Advanced Testing'}
                    </button>
                  </form>
                )}
                {error && (
                  <p className="mt-3 text-accent text-sm">{error}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-backgroundElevated" aria-label="Value propositions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-textPrimary mb-4">Tests Insurance Won't Cover</h2>
                <p className="text-textSecondary leading-relaxed">
                  ApoB, Lipoprotein(a), and particle size testing that cardiologists now recommend but insurance companies still deny in 2024.
                </p>
              </div>
              
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-textPrimary mb-4">No Doctor Visit Required</h2>
                <p className="text-textSecondary leading-relaxed">
                  Skip the 3-month wait times and awkward conversations about 'experimental' tests. Order advanced cardiac biomarkers directly.
                </p>
              </div>
              
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-textPrimary mb-4">Risk Tracking That Actually Matters</h2>
                <p className="text-textSecondary leading-relaxed">
                  Longitudinal monitoring of markers that predict heart attacks 10-20 years before symptoms, not just annual basic panels that miss early disease.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" aria-label="Frequently asked questions">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-textPrimary text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-backgroundElevated border border-border rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-border/10 transition-colors duration-200"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-medium text-textPrimary">{faq.question}</h3>
                    <span className={`text-2xl text-textMuted transform transition-transform duration-200 ${openFaq === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-textSecondary leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-backgroundElevated border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-textPrimary mb-4">CardioGuard</h3>
              <p className="text-textSecondary">Advanced Heart Testing Without Insurance Barriers</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-textPrimary mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="/blog" className="block text-textSecondary hover:text-textPrimary transition-colors duration-200">Heart Health Blog</a>
                <a href="/compare" className="block text-textSecondary hover:text-textPrimary transition-colors duration-200">Compare Tests</a>
                <a href="/faq" className="block text-textSecondary hover:text-textPrimary transition-colors duration-200">FAQ</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-textPrimary mb-4">Contact</h4>
              <p className="text-textSecondary">hello@cardioguard.com</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-textMuted">&copy; 2024 CardioGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}