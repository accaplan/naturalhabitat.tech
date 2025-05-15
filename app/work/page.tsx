import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

async function getProjects() {
  return await client.fetch(`
    {
      "projects": *[_type == "project"] | order(date desc) {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        categories[]->{ title, slug }
      },
      "categories": *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug
      }
    }
  `);
}

export default async function WorkPage() {
  const data = await getProjects();
  
  // Fallback data if Sanity isn't set up yet
  const fallbackCategories = [
    { _id: '1', title: 'All Projects', slug: { current: 'all' } },
    { _id: '2', title: 'Residential', slug: { current: 'residential' } },
    { _id: '3', title: 'Commercial', slug: { current: 'commercial' } },
    { _id: '4', title: 'Cultural', slug: { current: 'cultural' } },
    { _id: '5', title: 'Educational', slug: { current: 'educational' } }
  ];
  
  const fallbackProjects = [
    {
      _id: '1',
      title: 'Coastal Residence',
      slug: { current: 'coastal-residence' },
      mainImage: { url: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg' },
      excerpt: 'A modern beachfront home designed to embrace natural light and ocean views.',
      categories: [{ title: 'Residential', slug: { current: 'residential' } }]
    },
    {
      _id: '2',
      title: 'Urban Gallery',
      slug: { current: 'urban-gallery' },
      mainImage: { url: 'https://images.pexels.com/photos/137594/pexels-photo-137594.jpeg' },
      excerpt: 'A minimalist art gallery in the heart of the city with flexible exhibition spaces.',
      categories: [{ title: 'Cultural', slug: { current: 'cultural' } }]
    },
    {
      _id: '3',
      title: 'Mountain Retreat',
      slug: { current: 'mountain-retreat' },
      mainImage: { url: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg' },
      excerpt: 'A sustainable cabin that blends into its alpine surroundings.',
      categories: [{ title: 'Residential', slug: { current: 'residential' } }]
    },
    {
      _id: '4',
      title: 'Downtown Office',
      slug: { current: 'downtown-office' },
      mainImage: { url: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg' },
      excerpt: 'A modern office space designed for collaboration and creativity.',
      categories: [{ title: 'Commercial', slug: { current: 'commercial' } }]
    },
    {
      _id: '5',
      title: 'Campus Library',
      slug: { current: 'campus-library' },
      mainImage: { url: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg' },
      excerpt: 'A contemporary library designed for learning and community engagement.',
      categories: [{ title: 'Educational', slug: { current: 'educational' } }]
    },
    {
      _id: '6',
      title: 'Riverside Restaurant',
      slug: { current: 'riverside-restaurant' },
      mainImage: { url: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg' },
      excerpt: 'A dining experience that connects with its waterfront setting.',
      categories: [{ title: 'Commercial', slug: { current: 'commercial' } }]
    }
  ];
  
  const categories = [
    { _id: '0', title: 'All Projects', slug: { current: 'all' } },
    ...(data?.categories || fallbackCategories.slice(1))
  ];
  
  const projects = data?.projects || fallbackProjects;

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Work</h1>
          <p className="text-lg text-muted-foreground">
            Browse our portfolio of architectural projects spanning residential, commercial, cultural, and
            educational spaces. Each project reflects our commitment to innovative design, functionality,
            and contextual sensitivity.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category._id} value={category.slug.current}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          {categories.slice(1).map((category) => (
            <TabsContent key={category._id} value={category.slug.current} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter(project => 
                    project.categories.some(c => c.slug.current === category.slug.current)
                  )
                  .map(project => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/work/${project.slug.current}`} className="group block">
      <div className="overflow-hidden rounded-lg mb-4">
        <div className="relative aspect-[4/3]">
          <Image
            src={project.mainImage?.url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <h3 className="text-xl font-serif mb-2 group-hover:text-primary/80 transition-colors">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.categories?.map((category: any, index: number) => (
          <Badge key={index} variant="outline">
            {category.title}
          </Badge>
        ))}
      </div>
      <p className="text-muted-foreground">{project.excerpt}</p>
    </Link>
  );
}