
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'OMS (HRMS) Application',
    description: 'Developed a comprehensive HR management system. The application includes modules for employee management, attendance tracking, leave and payroll management, and admin functionalities.',
    technologies: ['ReactJS', 'Redux', 'NodeJS', 'SQL'],
    imageUrl: "https://picsum.photos/seed/hrms-app-interface/600/400",
    imageHint: "HRMS dashboard illustration", // Updated to reflect user-provided image
    // liveLink: '#', // Add live link if available
    // repoLink: '#', // Add repo link if available
  },
  {
    title: 'Autodesk Cloud Applications',
    description: 'Built a full-fledged, cloud-based application for managing users, projects, companies, and roles. Implemented features for adding/deleting and updating members, organizational data, document management system with file uploads, CRUD operations, and PDF comparison tools (civil drawing illustrations), issue tracking and assignment workflows.',
    technologies: ['ReactJS', 'Redux', 'SQL', 'Python'],
    imageUrl: "https://picsum.photos/seed/autodesk-cloud-docs/600/400",
    imageHint: "cloud document management", // Updated to reflect project description
    // liveLink: '#',
    // repoLink: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={project.imageHint}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                   <Code className="mr-3 h-7 w-7" />
                  {project.title}
                </CardTitle>
                <CardDescription className="text-foreground/80 min-h-[60px]">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              {(project.liveLink || project.repoLink) && (
                <CardFooter className="flex gap-4">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                      Live Demo <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                   {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                      View Code <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

