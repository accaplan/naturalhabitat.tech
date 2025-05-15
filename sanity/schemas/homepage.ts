export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
        },
        {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },
        {
          name: 'text',
          title: 'Text',
          type: 'text',
          rows: 3,
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'hero.heading',
    },
    prepare({ title }: { title: string }) {
      return {
        title: 'Homepage',
      };
    },
  },
};