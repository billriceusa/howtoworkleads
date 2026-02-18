import { groq } from 'next-sanity'

// Landing Page queries
export const landingPageQuery = groq`
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    focusKeyword,
    secondaryKeywords,
    ogImage,
    heroSection {
      headline,
      subheadline,
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink,
      backgroundImage
    },
    tableOfContents,
    content[] {
      ...,
      _type == "contentBlock" => {
        ...,
        content[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          }
        }
      }
    },
    relatedPages[]-> {
      _id,
      title,
      slug,
      seoDescription,
      category-> {
        title,
        slug
      }
    },
    category-> {
      _id,
      title,
      slug
    },
    author-> {
      _id,
      name,
      slug,
      image,
      bio
    },
    publishedAt,
    updatedAt
  }
`

export const landingPagePathsQuery = groq`
  *[_type == "landingPage" && defined(slug.current)] {
    "slug": slug.current,
    "category": category->slug.current
  }
`

// Category Page queries
export const categoryPageQuery = groq`
  *[_type == "categoryPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    description,
    ogImage,
    content[] {
      _type,
      _key,
      _type == "contentBlock" => {
        content[] {
          ...,
          markDefs[] {
            ...,
            _type == "internalLink" => {
              "reference": @.reference-> { slug }
            }
          }
        }
      },
      _type == "ctaSection" => {
        headline,
        description,
        ctaText,
        ctaLink,
        secondaryCtaText,
        secondaryCtaLink,
        subtext
      }
    },
    heroSection {
      headline,
      subheadline,
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink,
      backgroundImage
    },
    "resources": *[_type == "landingPage" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      seoDescription,
      publishedAt,
      heroSection {
        headline
      }
    },
    "articles": *[_type == "blogPost" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage
    }
  }
`

export const allCategoriesQuery = groq`
  *[_type == "categoryPage"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`

// Blog queries
export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    excerpt,
    mainImage,
    content,
    categories[]-> {
      _id,
      title,
      slug
    },
    author-> {
      _id,
      name,
      slug,
      image,
      bio
    },
    publishedAt,
    updatedAt
  }
`

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    categories[]-> {
      title,
      slug
    },
    author-> {
      name,
      image
    },
    publishedAt
  }
`

// Navigation query - fetches categories with their articles for navigation
export const navigationQuery = groq`
  {
    "categories": *[_type == "categoryPage"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      "articles": *[_type == "landingPage" && references(^._id)] | order(title asc) [0...5] {
        _id,
        title,
        "slug": slug.current
      }
    }
  }
`

// Sitemap query
export const sitemapQuery = groq`
  {
    "landingPages": *[_type == "landingPage" && defined(slug.current)] {
      "slug": slug.current,
      "category": category->slug.current,
      updatedAt,
      publishedAt
    },
    "categoryPages": *[_type == "categoryPage" && defined(slug.current)] {
      "slug": slug.current,
      updatedAt
    },
    "blogPosts": *[_type == "blogPost" && defined(slug.current)] {
      "slug": slug.current,
      updatedAt,
      publishedAt
    }
  }
`
