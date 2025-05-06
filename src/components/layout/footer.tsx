import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-muted py-8 text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Ashwini M. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link href="https://www.linkedin.com/in/ashwini123" target="_blank" rel="noopener noreferrer" passHref>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          {/* Placeholder for Github link if available later */}
          {/* <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" passHref>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5 text-primary" />
            </Button>
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
