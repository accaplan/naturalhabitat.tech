import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';

async function getJournalPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      categories[]->{ title }
    }
  `);
}

export default async function JournalPage() {
  const posts = await getJournalPosts();
  
  // Fallback data if Sanity isn't set up yet
  const fallbackPosts = [
    {
      _id: '1',
      title: 'Designing for Community: The Future of Public Spaces',
      slug: { current: 'designing-for-community' },
      excerpt: 'Exploring how architectural design can foster community engagement and create more inclusive public spaces.',
      mainImage: { url: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg' },
      publishedAt: '2023-09-15T12:00:00Z',
      categories: [{ title: 'Public Space' }, { title: 'Community Design' }]
    },
    {
      _id: '2',
      title: 'Material Innovations in Sustainable Construction',
      slug: { current: 'material-innovations' },
      excerpt: 'A look at emerging materials and techniques that are shaping more sustainable approaches to building.',
      mainImage: { url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg' },
      publishedAt: '2023-08-22T12:00:00Z',
      categories: [{ title: 'Sustainability' }, { title: 'Materials' }]
    },
    {
      _id: '3',
      title: 'Adaptive Reuse: Breathing New Life Into Old Structures',
      slug: { current: 'adaptive-reuse' },
      excerpt: 'How the practice of adaptive reuse can preserve architectural heritage while meeting contemporary needs.',
      mainImage: { url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg' },
      publishedAt: '2023-07-10T12:00:00Z',
      categories: [{ title: 'Historic Preservation' }, { title: 'Renovation' }]
    },
    {
      _id: '4',
      title: 'Biophilic Design: Connecting Architecture with Nature',
      slug: { current: 'biophilic-design' },
      excerpt: 'Exploring the principles of biophilic design and how it can improve wellbeing and environmental quality.',
      mainImage: { url: 'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg' },
      publishedAt: '2023-06-05T12:00:00Z',
      categories: [{ title: 'Biophilia' }, { title: 'Wellbeing' }]
    }
  ];
  
  const journalPosts = posts || fallbackPosts;

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Journal</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, insights, and explorations from the Romance Office team on architecture,
            design, and the built environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 mb-16">
          {journalPosts.map((post, index) => (
            <article key={post._id} className={`${index === 0 ? 'featured-post' : ''}`}>
              <Link href={`/journal/${post.slug.current}`} className="group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={post.mainImage?.url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories?.map((category: any, i: number) => (
                        <Badge key={i} variant="outline">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-primary/80 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <time dateTime={post.publishedAt}>
                        {formatDistance(new Date(post.publishedAt), new Date(), { addSuffix: true })}
                      </time>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Want to stay updated with our latest insights?
          </p>
          <Link 
            href="/contact" 
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Subscribe to our newsletter
          </Link>
        </div>
      </div>
    </div>
  );
}