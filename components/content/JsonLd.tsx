'use client'

interface JsonLdProps {
  schema: Record<string, any>
}

export default function JsonLd({ schema }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...schema
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}