import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';

async function getAboutData() {
  return await client.fetch(`
    {
      "about": *[_type == "about"][0] {
        title,
        introduction,
        mission,
        vision,
        mainImage,
        approachSections[]{
          title,
          description
        }
      },
      "team": *[_type == "teamMember"] | order(order asc) {
        _id,
        name,
        role,
        bio,
        image
      }
    }
  `);
}

export default async function AboutPage() {
  const data = await getAboutData();
  
  // Fallback data if Sanity data isn't available yet
  const fallbackAbout = {
    title: "About Romance Office",
    introduction: "Romance Office is an architectural design studio founded in 2010. We approach each project with curiosity and a deep commitment to creating spaces that inspire and endure.",
    mission: "Our mission is to create thoughtful, innovative architecture that responds to human needs, enhances the environment, and stands the test of time.",
    vision: "We envision a world where architecture serves as a positive force in creating sustainable, equitable, and beautiful environments for all.",
    mainImage: { url: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg" },
    approachSections: [
      {
        title: "Research & Discovery",
        description: "We begin each project with extensive research and site exploration to understand the unique context, constraints, and opportunities."
      },
      {
        title: "Concept Development",
        description: "We develop strong conceptual frameworks that guide design decisions and create coherent architectural narratives."
      },
      {
        title: "Iterative Design",
        description: "Our design process involves continuous testing and refinement to optimize solutions and address project requirements."
      },
      {
        title: "Collaborative Execution",
        description: "We work closely with clients, consultants, and craftspeople to bring our designs to life with precision and care."
      }
    ]
  };
  
  const about = data?.about || fallbackAbout;
  
  const fallbackTeam = [
    {
      _id: '1',
      name: 'Sofia Rodriguez',
      role: 'Principal Architect & Founder',
      bio: 'Sofia established Romance Office in 2010 after working at several renowned international firms. She brings a unique perspective informed by her global experience and cultural sensitivity.',
      image: { url: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg' }
    },
    {
      _id: '2',
      name: 'Marcus Chen',
      role: 'Design Director',
      bio: 'Marcus leads our design team with a focus on innovative spatial concepts and material explorations. His work has been recognized with numerous awards.',
      image: { url: 'https://images.pexels.com/photos/3766165/pexels-photo-3766165.jpeg' }
    },
    {
      _id: '3',
      name: 'Aisha Patel',
      role: 'Project Manager',
      bio: 'Aisha oversees project delivery with exceptional attention to detail and client communication. She ensures our designs are executed with precision.',
      image: { url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' }
    },
    {
      _id: '4',
      name: 'Jacob Thompson',
      role: 'Sustainability Specialist',
      bio: 'Jacob brings expertise in sustainable design strategies and environmental performance. He ensures our projects meet the highest standards of environmental responsibility.',
      image: { url: 'https://images.pexels.com/photos/976337/pexels-photo-976337.jpeg' }
    }
  ];
  
  const team = data?.team || fallbackTeam;

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">{about.title}</h1>
          <p className="text-lg text-muted-foreground">
            {about.introduction}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={about.mainImage?.url}
              alt="Romance Office Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-serif mb-6">Our Purpose</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-serif mb-3">Mission</h3>
              <p className="text-muted-foreground mb-6">{about.mission}</p>
              
              <h3 className="text-xl font-serif mb-3">Vision</h3>
              <p className="text-muted-foreground">{about.vision}</p>
            </div>
            
            <Button asChild className="rounded-full">
              <Link href="/contact">
                Work With Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mb-24">
          <h2 className="text-3xl font-serif mb-12 text-center">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {about.approachSections.map((section: any, index: number) => (
              <div key={index} className="bg-accent p-8 rounded-lg">
                <h3 className="text-xl font-serif mb-4">{section.title}</h3>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-16" />
        
        <div>
          <h2 className="text-3xl font-serif mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member: any) => (
              <div key={member._id} className="text-center">
                <div className="relative aspect-square rounded-full overflow-hidden mb-4 w-48 h-48 mx-auto">
                  <Image
                    src={member.image?.url}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-xl font-serif mb-1">{member.name}</h3>
                <p className="text-muted-foreground mb-3">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}