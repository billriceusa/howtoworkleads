'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui'

interface DownloadFormProps {
  slug: string
  title: string
}

export function DownloadForm({ slug, title }: DownloadFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, slug }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setDownloadUrl(data.downloadUrl)
        // Auto-trigger download
        const link = document.createElement('a')
        link.href = data.downloadUrl
        link.download = ''
        link.click()
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-secondary-100 p-8 text-center">
        <div className="mb-4 text-3xl">&#10003;</div>
        <h3 className="font-serif text-xl font-bold text-black">
          Your download is ready!
        </h3>
        <p className="mt-2 text-secondary-600">
          Your download of <strong>{title}</strong> should start automatically.
        </p>
        <a
          href={downloadUrl}
          download
          className="mt-4 inline-block font-semibold text-black underline underline-offset-4 hover:text-brand-yellow"
        >
          Click here if the download didn&apos;t start
        </a>
        <p className="mt-6 text-sm text-secondary-500">
          Check your inbox for a welcome email from The Aged Lead Playbook.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <label htmlFor="download-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="download-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="h-12 flex-1 min-w-0 px-4 text-sm border border-secondary-300 bg-white text-black placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Get the Free Download'}
        </Button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-center text-sm text-red-600">{errorMessage}</p>
      )}
    </form>
  )
}
