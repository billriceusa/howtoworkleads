import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

interface MarkdownProps {
  content: string
  className?: string
  /** Use prose styling (for long-form content) */
  prose?: boolean
}

/**
 * Renders markdown content with appropriate styling.
 * Supports headings, bold, italic, links, lists, code, and blockquotes.
 */
export function Markdown({ content, className, prose = false }: MarkdownProps) {
  if (!content) return null

  const wrapperClassName = cn(
    prose && 'prose prose-gray max-w-none',
    className
  )

  const markdownContent = (
    <ReactMarkdown
      components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 text-xl font-semibold text-gray-900">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="mb-2 text-lg font-semibold text-gray-900">{children}</h4>
        ),
        // Paragraphs
        p: ({ children }) => (
          <p className="mb-2 last:mb-0">{children}</p>
        ),
        // Links - Yellow highlight style
        a: ({ href, children }) => (
          <a
            href={href}
            className="bg-brand-yellow text-black font-bold no-underline transition-all hover:bg-transparent hover:font-normal hover:underline hover:decoration-black"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        // Lists
        ul: ({ children }) => (
          <ul className="mb-2 list-disc pl-5 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 list-decimal pl-5 space-y-1">{children}</ol>
        ),
        li: ({ children }) => (
          <li>{children}</li>
        ),
        // Inline code
        code: ({ children }) => (
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800">
            {children}
          </code>
        ),
        // Code blocks
        pre: ({ children }) => (
          <pre className="mb-2 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
            {children}
          </pre>
        ),
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="mb-2 border-l-4 border-primary-300 pl-4 italic text-gray-600">
            {children}
          </blockquote>
        ),
        // Bold and italic are handled automatically by react-markdown
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        // Horizontal rule
        hr: () => (
          <hr className="my-4 border-gray-200" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )

  // Wrap in a div if we have a className to apply
  if (wrapperClassName) {
    return <div className={wrapperClassName}>{markdownContent}</div>
  }

  return markdownContent
}
