import { StructureBuilder } from 'sanity/desk'
import {
  DocumentTextIcon,
  FolderIcon,
  EditIcon,
  UserIcon,
  CogIcon,
} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Landing Pages
      S.listItem()
        .title('Landing Pages')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('landingPage')
            .title('Landing Pages')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      // Categories
      S.listItem()
        .title('Categories')
        .icon(FolderIcon)
        .child(
          S.documentTypeList('categoryPage')
            .title('Categories')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // Blog
      S.listItem()
        .title('Blog Posts')
        .icon(EditIcon)
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.divider(),

      // Authors
      S.listItem()
        .title('Authors')
        .icon(UserIcon)
        .child(
          S.documentTypeList('author')
            .title('Authors')
        ),

      S.divider(),

      // Content by Category (filtered view)
      S.listItem()
        .title('Content by Category')
        .icon(FolderIcon)
        .child(
          S.documentTypeList('categoryPage')
            .title('Select Category')
            .child((categoryId) =>
              S.documentList()
                .title('Articles')
                .filter('_type == "landingPage" && category._ref == $categoryId')
                .params({ categoryId })
            )
        ),
    ])
