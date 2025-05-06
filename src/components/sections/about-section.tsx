import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    institution: 'B.E.S College',
    degree: 'BCA (Bachelor of Computer Applications)',
    year: '2022',
    grade: '7.38 CGPA',
  },
  {
    institution: 'M.D.R.S PU College',
    degree: 'PCMCs',
    year: '2019',
    grade: '66.00%',
  },
  {
    institution: 'Nalanda Vidyanikethan School',
    degree: 'SSLC',
    year: '2017',
    grade: '66.40%',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            I am a passionate Software Engineer dedicated to crafting efficient and user-friendly web applications. With a solid foundation in modern web technologies and a keen eye for detail, I strive to create impactful digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <GraduationCap className="mr-3 h-7 w-7 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg bg-background hover:bg-secondary/50 transition-colors duration-200 transform hover:scale-105 hover:shadow-md">
                  <h3 className="text-lg font-semibold text-primary">{edu.institution}</h3>
                  <p className="text-md text-foreground">{edu.degree} - {edu.year}</p>
                  <p className="text-sm text-muted-foreground">{edu.grade}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary"><path d="M10.3 2.2c-.1.2-.2.3-.3.5-.3.4-.4.9-.4 1.3H8.3c-.4 0-.8.2-1.1.4-.3.2-.5.5-.6.9-.1.4-.1.8.1 1.2.2.4.5.7.9.9.4.2.9.2 1.3.1.2-.1.4-.2.5-.3L10.5 6c.2.1.4.2.6.2.4 0 .8-.1 1.2-.3.4-.2.7-.5.9-.9s.2-.8.1-1.2c-.1-.4-.4-.8-.8-1-.4-.2-.8-.3-1.2-.2h-1.2c0-.3.1-.7.2-1 .1-.3.3-.6.6-.8.3-.2.7-.3 1.1-.3.2 0 .3 0 .5.1.2.1.4.1.6.2s.3.2.5.3c.2.1.4.3.5.5l.1.1c.1.1.2.2.2.2.1.1.2.2.3.2.1 0 .2-.1.3-.1.2-.1.4-.3.5-.5.1-.2.2-.4.2-.6.1-.2.1-.5 0-.7-.1-.2-.2-.4-.4-.6-.2-.2-.4-.3-.6-.4-.2-.1-.5-.1-.7-.1l-.2.1c-.1.1-.2.1-.2.2s-.2.1-.3.1c-.2.1-.4.1-.6.1s-.4-.1-.6-.2l-.5-.2c-.2-.1-.4-.3-.5-.5C10.7 2.4 10.5 2.3 10.3 2.2zM13.6 21.8c.1-.2.2-.3.3-.5.3-.4.4-.9.4-1.3h1.3c.4 0 .8-.2 1.1-.4.3-.2.5-.5.6-.9.1-.4.1-.8-.1-1.2-.2-.4-.5-.7-.9-.9-.4-.2-.9-.2-1.3-.1-.2.1-.4.2-.5.3l-1.4 1.1c-.2-.1-.4-.2-.6-.2-.4 0-.8.1-1.2.3-.4.2-.7.5-.9.9s-.2.8-.1 1.2c.1.4.4.8.8 1 .4.2.8.3 1.2.2h1.2c0 .3-.1.7-.2 1-.1.3-.3.6-.6.8-.3.2-.7.3-1.1.3-.2 0-.3 0-.5-.1-.2-.1-.4-.1-.6-.2s-.3-.2-.5-.3c-.2-.1-.4-.3-.5-.5l-.1-.1c-.1-.1-.2-.2-.2-.2-.1-.1-.2-.2-.3-.2-.1 0-.2.1-.3.1-.2.1-.4.3-.5.5-.1.2-.2.4-.2.6-.1.2-.1-.5 0 .7.1.2.2.4.4.6.2.2.4.3.6.4.2.1.5.1.7.1l.2-.1c.1-.1.2-.1.2-.2s.2-.1.3-.1c.2-.1.4-.1.6-.1.2 0 .4.1.6.2l.5.2c.2.1.4.3.5.5.2.2.3.3.5.4zM4.2 10.3c-.2-.1-.3-.2-.5-.3-.4-.3-.9-.4-1.3-.4H2c-.4 0-.8.2-1.1.4-.3.2-.5.5-.6.9-.1.4-.1.8.1 1.2.2.4.5.7.9.9s.9.2 1.3.1c.1-.2.2-.3.3-.5l1.1-1.4c.1-.2.2-.4.2-.6 0-.4-.1-.8-.3-1.2-.2-.4-.5-.7-.9-.9s-.8-.2-1.2-.1c-.4.1-.8.4-1 .8-.2.4-.3.8-.2 1.2V12c.3 0 .7-.1 1-.2.3-.1.6-.3.8-.6.2-.3.3-.7.3-1.1 0-.2 0-.3-.1-.5-.1-.2-.1-.4-.2-.6s-.2-.3-.3-.5c-.1-.2-.3-.4-.5-.5l-.1-.1c-.1-.1-.2-.2-.2-.2-.1-.1-.2-.2-.2-.3 0-.1.1-.2.1-.3.1-.2.3-.4.5-.5.2-.1.4-.2.6-.2.2-.1.5-.1.7 0 .2.1.4.2.6.4.2.2.3.4.4.6.1.2.1.5.1.7l-.1.2c-.1.1-.1.2-.2.2s-.1.2-.1.3c-.1.2-.1.4-.1.6s.1.4.2.6l.2.5c.1.2.3.4.5.5.2.2.3.3.4.5zM19.8 13.6c.2.1.3.2.5.3.4.3.9.4 1.3.4h.5c.4 0 .8-.2 1.1-.4.3-.2.5-.5.6-.9.1-.4.1-.8-.1-1.2-.2-.4-.5-.7-.9-.9s-.9-.2-1.3-.1c-.1.2-.2.3-.3.5l-1.1 1.4c-.1.2-.2.4-.2-.6 0 .4.1.8.3 1.2.2.4.5.7.9.9s.8.2 1.2.1c.4-.1.8-.4 1-.8.2-.4.3-.8.2-1.2v-.5c-.3 0-.7.1-1 .2-.3.1-.6.3-.8.6-.2.3-.3.7-.3 1.1 0 .2 0 .3.1.5.1.2.1.4.2.6s.2.3.3.5c.1.2.3.4.5.5l.1.1c.1.1.2.2.2.2.1.1.2.2.2.3 0 .1-.1.2-.1.3-.1.2-.3.4-.5.5-.2.1-.4.2-.6.2-.2.1-.5.1-.7 0-.2-.1-.4-.2-.6-.4-.2-.2-.3-.4-.4-.6-.1-.2-.1-.5-.1-.7l.1-.2c.1-.1.1-.2.2-.2s.1-.2.1-.3c.1-.2.1-.4.1-.6 0-.2-.1-.4-.2-.6l-.2-.5c-.1-.2-.3-.4-.5-.5-.2-.2-.3-.3-.4-.5z"></path></svg>
                Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-background hover:bg-secondary/50 transition-colors duration-200 transform hover:scale-105 hover:shadow-md">
                <h3 className="text-lg font-semibold text-primary">Python Full stack Development</h3>
                <p className="text-md text-foreground">Besant Technologies</p>
                <p className="text-sm text-muted-foreground">December 2022 – May 2023</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
