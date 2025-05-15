export default {
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 3,
    },
    {
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 3,
    },
    {
      name: 'vision',
      title: 'Vision',
      type: 'text',
      rows: 3,
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'approachSections',
      title: 'Approach Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
};