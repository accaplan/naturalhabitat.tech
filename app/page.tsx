import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

async function getHomepageData() {
  return await client.fetch(`
    {
      "hero": *[_type == "homepage"][0].hero,
      "featuredProjects": *[_type == "project" && featured == true] | order(date desc) [0...3] {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        categories[]->{ title }
      },
      "about": *[_type == "homepage"][0].about
    }
  `);
}

export default async function Home() {
  const data = await getHomepageData();
  
  // Fallback content if Sanity data isn't available yet
  const fallbackHero = {
    heading: "We craft spaces that inspire and endure",
    subheading: "Romance Office is an award-winning architectural design studio creating thoughtful, innovative spaces across residential, commercial, and cultural sectors.",
    image: {
      url: "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg"
    }
  };
  
  const hero = data?.hero || fallbackHero;
  
  const fallbackProjects = [
    {
      _id: '1',
      title: 'Coastal Residence',
      slug: { current: 'coastal-residence' },
      mainImage: { url: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg' },
      excerpt: 'A modern beachfront home designed to embrace natural light and ocean views.',
      categories: [{ title: 'Residential' }]
    },
    {
      _id: '2',
      title: 'Urban Gallery',
      slug: { current: 'urban-gallery' },
      mainImage: { url: 'https://images.pexels.com/photos/137594/pexels-photo-137594.jpeg' },
      excerpt: 'A minimalist art gallery in the heart of the city with flexible exhibition spaces.',
      categories: [{ title: 'Cultural' }]
    },
    {
      _id: '3',
      title: 'Mountain Retreat',
      slug: { current: 'mountain-retreat' },
      mainImage: { url: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg' },
      excerpt: 'A sustainable cabin that blends into its alpine surroundings.',
      categories: [{ title: 'Residential' }]
    }
  ];
  
  const projects = data?.featuredProjects || fallbackProjects;
  
  const fallbackAbout = {
    heading: "Design philosophy",
    text: "We believe architecture should respond thoughtfully to its context while creating spaces that enhance the human experience. Our work is characterized by rigorous attention to detail, innovative use of materials, and a commitment to sustainability.",
    image: {
      url: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
    }
  };
  
  const about = data?.about || fallbackAbout;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.image?.url}
            alt="Romance Office Architecture"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-6 leading-tight">
              {hero.heading}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {hero.subheading}
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/work">
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 md:mb-0">Selected Work</h2>
            <Link 
              href="/work" 
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link href={`/work/${project.slug.current}`} key={project._id} className="group">
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
                <div className="flex items-center mb-3">
                  {project.categories?.map((category, index) => (
                    <span key={index} className="text-xs text-muted-foreground mr-2">
                      {category.title}
                      {index < project.categories.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground">{project.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">{about.heading}</h2>
              <p className="text-muted-foreground mb-8 text-lg">{about.text}</p>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/about">
                  About The Studio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={about.image?.url}
                  alt="Romance Office Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Let's Create Something Together</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you have a specific project in mind or want to explore possibilities,
            we'd love to hear from you and discuss how we can bring your vision to life.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}