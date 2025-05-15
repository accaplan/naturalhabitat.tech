import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { formatDistance, format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: {
    slug: string;
  };
};

async function getPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt,
      author->{
        name,
        image
      },
      categories[]->{ title },
      "relatedPosts": *[_type == "post" && slug.current != $slug][0...3] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      }
    }
  `, { slug });
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Fallback data if Sanity content isn't available
  const mainImageUrl = post.mainImage?.url || 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg';
  
  const fallbackBody = `
    <p>Architecture is not just about creating physical structures; it's about designing experiences and shaping the way people interact with their environment. At Romance Office, we approach each project with a deep consideration for how spaces affect human behavior, emotions, and wellbeing.</p>
    <p>In our practice, we've observed that the most successful spaces are those that balance functionality with aesthetic appeal, that respect their context while introducing fresh perspectives, and that meet immediate needs while anticipating future changes.</p>
    <h2>The Importance of Context</h2>
    <p>Every site has its own story, its own physical and cultural context that should inform design decisions. Whether we're working in a dense urban environment or a pristine natural setting, we begin by listening to what the site tells us. This might involve studying the path of the sun, prevailing winds, surrounding buildings, or local building traditions.</p>
    <p>By responding thoughtfully to context, we create architecture that feels like it belongs—not imposed, but grown organically from its surroundings. This doesn't mean mimicking what's already there, but rather entering into a dialogue with it.</p>
    <h2>Materials and Craft</h2>
    <p>The materials we select and how we use them are central to our design approach. We're interested in the tactile qualities of materials, the way they age and weather, and the stories they tell about place and time. We value craft and detail, believing that the care put into the smallest elements of a project resonate in the experience of the whole.</p>
    <p>In an age of rapid production and disposability, we're committed to creating buildings that are built to last, both physically and in the affections of those who use them.</p>
    <h2>Looking Forward</h2>
    <p>As we continue to grow as a practice, we remain committed to these core principles while embracing new challenges and opportunities. We're particularly excited about exploring how traditional construction methods can be combined with emerging technologies to create architecture that is environmentally responsible, socially inclusive, and emotionally resonant.</p>
    <p>We invite you to join us on this journey, whether as a client, collaborator, or fellow enthusiast of the built environment.</p>
  `;
  
  const bodyContent = post.body || fallbackBody;
  
  const authorName = post.author?.name || 'Sophie Williams';
  const authorImage = post.author?.image?.url || 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg';
  
  const fallbackRelatedPosts = [
    {
      _id: '1',
      title: 'Material Innovations in Sustainable Construction',
      slug: { current: 'material-innovations' },
      mainImage: { url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg' },
      publishedAt: '2023-08-22T12:00:00Z',
    },
    {
      _id: '2',
      title: 'Adaptive Reuse: Breathing New Life Into Old Structures',
      slug: { current: 'adaptive-reuse' },
      mainImage: { url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg' },
      publishedAt: '2023-07-10T12:00:00Z',
    },
    {
      _id: '3',
      title: 'Biophilic Design: Connecting Architecture with Nature',
      slug: { current: 'biophilic-design' },
      mainImage: { url: 'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg' },
      publishedAt: '2023-06-05T12:00:00Z',
    }
  ];
  
  const relatedPosts = post.relatedPosts || fallbackRelatedPosts;
  
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
    : 'Recently published';

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <Button asChild variant="outline" className="mb-8 mt-8">
          <Link href="/journal">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journal
          </Link>
        </Button>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category: any, index: number) => (
              <Badge key={index} variant="outline">
                {category.title}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center mb-8">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={authorImage}
                alt={authorName}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <p className="font-medium">{authorName}</p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={mainImageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mb-16">
          <div 
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost: any) => (
              <Link key={relatedPost._id} href={`/journal/${relatedPost.slug.current}`} className="group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={relatedPost.mainImage?.url}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-serif mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
                <time 
                  dateTime={relatedPost.publishedAt}
                  className="text-sm text-muted-foreground"
                >
                  {formatDistance(new Date(relatedPost.publishedAt), new Date(), { addSuffix: true })}
                </time>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}