import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: {
    slug: string;
  };
};

async function getProject(slug: string) {
  return await client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      date,
      mainImage,
      images,
      client,
      location,
      excerpt,
      description,
      categories[]->{ title, slug },
      nextProject->{
        title,
        slug
      }
    }
  `, { slug });
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound();
  }
  
  // Fallback data if Sanity image isn't available
  const mainImageUrl = project.mainImage?.url || 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg';
  
  const fallbackImages = [
    { url: 'https://images.pexels.com/photos/1619383/pexels-photo-1619383.jpeg' },
    { url: 'https://images.pexels.com/photos/2736148/pexels-photo-2736148.jpeg' },
    { url: 'https://images.pexels.com/photos/3554424/pexels-photo-3554424.jpeg' }
  ];
  
  const images = project.images || fallbackImages;
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 mt-8 gap-4">
          <Button asChild variant="outline" className="w-fit">
            <Link href="/work">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </Button>
          
          {project.nextProject && (
            <div className="text-right">
              <span className="text-sm text-muted-foreground block mb-1">Next Project</span>
              <Link 
                href={`/work/${project.nextProject.slug.current}`}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {project.nextProject.title}
              </Link>
            </div>
          )}
        </div>
        
        <div className="relative aspect-[16/9] mb-12 rounded-lg overflow-hidden">
          <Image
            src={mainImageUrl}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">{project.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{project.excerpt}</p>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>{project.description || 'A detailed description of the project will be available here.'}</p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-lg font-serif mb-4">Project Details</h3>
              
              {project.client && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <p>{project.client}</p>
                </div>
              )}
              
              {project.location && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p>{project.location}</p>
                </div>
              )}
              
              {project.date && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Year</h4>
                  <p>{new Date(project.date).getFullYear()}</p>
                </div>
              )}
              
              {project.categories && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category: any) => (
                      <Badge key={category._id} variant="outline">
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {images.map((image: any, index: number) => (
            <div 
              key={index} 
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={image.url}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-serif mb-6">Interested in working together?</h3>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}