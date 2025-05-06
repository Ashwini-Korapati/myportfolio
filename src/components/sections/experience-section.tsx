import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    company: 'NM IT solutions pvt ltd',
    location: 'Bengaluru',
    role: 'Software Engineer',
    period: 'October 2023 – Present',
    responsibilities: [
      'Developed and optimized software applications to enhance performance and user experience.',
      'Collaborated with cross-functional teams to drive project delivery and align on technical requirements.',
      'Implemented best coding practices and conducted code reviews to ensure code quality.',
      'Engaged in troubleshooting and debugging to resolve software issues efficiently.',
      'Participated in continuous learning and adaptation of new technologies to foster innovation.',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-card/90 dark:hover:bg-card/80">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <CardTitle className="text-2xl text-primary flex items-center mb-2 sm:mb-0">
                    <Briefcase className="mr-3 h-7 w-7" />
                    {exp.role}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <CardDescription className="text-lg">
                  {exp.company} - {exp.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
