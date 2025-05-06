import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="home" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Hi, I&apos;m <span className="text-primary">Ashwini M.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Software Engineer
          </p>
          <p className="text-lg text-foreground/80 max-w-xl mx-auto md:mx-0">
            Motivated and detail-oriented Software Engineer with 2 years of experience in developing dynamic web applications. Passionate about building scalable, user-centric solutions and continuously learning new technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/resume/Ashwini_M_Resume.pdf" download passHref>
              <Button size="lg" className="w-full sm:w-auto group">
                Download Resume <Download className="ml-2 h-5 w-5 group-hover:animate-bounce" />
              </Button>
            </Link>
            <Link href="#contact" passHref>
              <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                Get in Touch <Send className="ml-2 h-5 w-5 group-hover:animate-ping" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/ashwini123" target="_blank" rel="noopener noreferrer" passHref>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto group">
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-pink-600 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Image
            src="https://picsum.photos/seed/ashwini-profile/400/400"
            alt="Ashwini M Profile Picture"
            width={400}
            height={400}
            className="rounded-full mx-auto shadow-2xl relative z-10 object-cover"
            data-ai-hint="professional portrait"
            priority
          />
        </div>
      </div>
    </section>
  );
}
