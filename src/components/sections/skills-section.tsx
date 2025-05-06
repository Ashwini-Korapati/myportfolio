import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Server, Smartphone, Palette } from 'lucide-react'; // Example icons

// Placeholder icons for specific technologies - replace with actual or more generic ones
const ReactJSIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>;
const JavaScriptIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18h4"></path><path d="M16 22h4"></path><path d="M16 14h4"></path><path d="M12 6V4H8C6.35 4 5.26 4.78 4.53 5.79A4.57 4.57 0 0 0 3 8.5c0 1.56.83 2.83 2.02 3.52L3 14v2h6v-2H7.5c-.9 0-1.5-.5-1.5-1s.6-1 1.5-1H12V4h1.47C14.22 4.78 15.35 4 17 4h3v2h-3c-.9 0-1.5.5-1.5 1s.6 1 1.5 1H17v2h-3c-.9 0-1.5.5-1.5 1s.6 1 1.5 1H17v2h-3c-1.65 0-2.78-.78-3.53-1.79A4.57 4.57 0 0 1 9 15.5c0-1.56-.83-2.83-2.02-3.52L9 10V8h1.5c.9 0 1.5.5 1.5 1s-.6 1-1.5 1H8V6h4z"></path></svg>;
const NodeJSIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 18.5a2.5 2.5 0 0 1-4.24-1.94 2.5 2.5 0 0 1 3.18-3.18 2.5 2.5 0 0 1 1.06 5.12zM17.8 8.2c-1 .8-1.5 2.1-1.5 3.4 0 2.7 2.2 4.9 4.9 4.9.8 0 1.6-.2 2.3-.6"></path><path d="M8.7 15.3C5.4 14.2 3.5 10.9 4.6 7.6c.8-2.2 2.7-3.8 5-4.2 4.4-.8 8.5 2.4 8.5 6.6 0 2.1-.9 4-2.4 5.2"></path><path d="m2 2 20 20"></path></svg>;
const PythonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 2H10c-1 0-1.5.5-1.5 1.5v1c0 1 .5 1.5 1.5 1.5H12c1 0 1.5.5 1.5 1.5v1c0 1-.5 1.5-1.5 1.5h-1c-1 0-1.5.5-1.5 1.5v4c0 1 .5 1.5 1.5 1.5h1.5c1 0 1.5-.5 1.5-1.5V12c0-1-.5-1.5-1.5-1.5H11c-1 0-1.5-.5-1.5-1.5v-1c0-1 .5-1.5 1.5-1.5h2.5c1 0 1.5-.5 1.5-1.5v-1c0-1-.5-1.5-1.5-1.5z"></path><path d="M10.5 22H14c1 0 1.5-.5 1.5-1.5v-1c0-1-.5-1.5-1.5-1.5H12c-1 0-1.5-.5-1.5-1.5v-1c0-1 .5-1.5 1.5-1.5h1c1 0 1.5-.5 1.5-1.5v-4c0-1-.5-1.5-1.5-1.5H10.5c-1 0-1.5.5-1.5 1.5V12c0 1 .5 1.5 1.5 1.5H13c1 0 1.5.5 1.5 1.5v1c0 1-.5 1.5-1.5 1.5h-2.5c-1 0-1.5.5-1.5 1.5v1c0 1 .5 1.5 1.5 1.5z"></path></svg>;
const SQLIcon = () => <Database className="h-5 w-5" />;
const MongoDbIcon = () => <Database className="h-5 w-5" />;
const HtmlIcon = () => <Code className="h-5 w-5" />;
const TailwindCssIcon = () => <Palette className="h-5 w-5" />;
const BootstrapIcon = () => <Palette className="h-5 w-5" />;
const ReduxIcon = () => <Smartphone className="h-5 w-5" />; // Generic state management icon

const skills = {
  frontend: [
    { name: 'ReactJS', icon: <ReactJSIcon /> },
    { name: 'JavaScript', icon: <JavaScriptIcon /> },
    { name: 'HTML', icon: <HtmlIcon /> },
    { name: 'Tailwind CSS', icon: <TailwindCssIcon /> },
    { name: 'Bootstrap', icon: <BootstrapIcon /> },
  ],
  backend: [
    { name: 'NodeJS', icon: <NodeJSIcon /> },
    { name: 'Python', icon: <PythonIcon /> },
    { name: 'Web Services', icon: <Server className="h-5 w-5" /> },
    { name: 'JWT', icon: <Server className="h-5 w-5" /> }, // Using Server for auth related
    { name: 'OAuth', icon: <Server className="h-5 w-5" /> },
  ],
  database: [
    { name: 'SQL', icon: <SQLIcon /> },
    { name: 'MongoDB', icon: <MongoDbIcon /> },
  ],
  stateManagement: [
    { name: 'Redux', icon: <ReduxIcon /> },
  ],
};

const SkillCategoryCard: React.FC<{ title: string; skills: { name: string; icon: JSX.Element }[] }> = ({ title, skills }) => (
  <Card className="bg-transparent hover:bg-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <CardHeader>
      <CardTitle className="text-xl text-primary flex items-center">
        <Code className="mr-2 h-6 w-6" /> {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <Badge
            key={skill.name}
            variant="secondary"
            className="text-md px-4 py-2 flex items-center gap-2 bg-background border border-primary/30 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {skill.icon}
            {skill.name}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <SkillCategoryCard title="Frontend" skills={skills.frontend} />
          <SkillCategoryCard title="Backend" skills={skills.backend} />
          <SkillCategoryCard title="Database" skills={skills.database} />
          <SkillCategoryCard title="State Management" skills={skills.stateManagement} />
        </div>
      </div>
    </section>
  );
}
