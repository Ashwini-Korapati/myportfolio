
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, Send, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const resumePdfPath = "/resume/Ashwini_M_Resume.pdf";
// Replace with your actual Formspree form ID or use your email directly
const FORMSPREE_ENDPOINT = "https://formspree.io/f/aashv143@gmail.com";


export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' }); // Reset form
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
          variant: "default",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Formspree submission failed");
      }
    } catch (error) {
      console.error("Error sending message via Formspree:", error);
      let errorMessage = "There was a problem sending your message. Please try again later or contact me directly via email.";
      if (error instanceof Error && error.message) {
        errorMessage = error.message.includes("form_not_found") 
          ? "The contact form is not configured correctly. Please ensure the Formspree ID is valid."
          : error.message;
      }
      toast({
        title: "Error Sending Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-xl mx-auto">
            Have a question or want to work together? Feel free to reach out.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 p-2">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <Send className="mr-3 h-7 w-7" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-background"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground/80">Message</Label>
                  <Textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-background"
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" className="w-full group" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                  <a href="mailto:aashv143@gmail.com">aashv143@gmail.com</a>
                </div>
                <div className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>+91 95130 35255</span>
                </div>
                <div className="flex items-center space-x-3 text-foreground/80 hover:text-primary transition-colors">
                  <Linkedin className="h-6 w-6 text-primary" />
                  <Link href="https://www.linkedin.com/in/ashwini123" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/ashwini123
                  </Link>
                </div>
              </CardContent>
            </Card>
             <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-xl text-primary">Resume</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80 mb-4">View my latest resume for more details about my experience and skills.</p>
                    <a href={resumePdfPath} download="Ashwini_M_Resume.pdf">
                        <Button className="w-full sm:w-auto group">
                            Download Resume <Download className="ml-2 h-5 w-5 group-hover:animate-bounce" />
                        </Button>
                    </a>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
