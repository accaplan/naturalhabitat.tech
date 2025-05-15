"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would send this data to your backend or a service
    console.log(values);
    
    // Simulate submission success
    setTimeout(() => {
      setIsSubmitted(true);
      form.reset();
    }, 1000);
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Reach out to discuss your project or just say hello.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="bg-accent p-8 rounded-lg text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-serif mb-4">Message Sent!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We've received your message and will get back to you soon.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Message subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project or inquiry" 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            )}
          </div>
          
          <div>
            <div className="bg-accent p-6 rounded-lg mb-6">
              <h3 className="text-lg font-serif mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mt-1 mr-3 text-primary" />
                  <div>
                    <h4 className="text-sm font-medium">Email</h4>
                    <a 
                      href="mailto:hello@romanceoffice.com" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      hello@romanceoffice.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mt-1 mr-3 text-primary" />
                  <div>
                    <h4 className="text-sm font-medium">Phone</h4>
                    <a 
                      href="tel:+12125550123" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +1 (212) 555-0123
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 text-primary" />
                  <div>
                    <h4 className="text-sm font-medium">Address</h4>
                    <address className="not-italic text-muted-foreground">
                      123 Architecture Street<br />
                      Design District<br />
                      New York, NY 10001
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-lg font-serif mb-4">Office Hours</h3>
              
              <Tabs defaultValue="weekdays">
                <TabsList className="w-full">
                  <TabsTrigger value="weekdays" className="flex-1">Weekdays</TabsTrigger>
                  <TabsTrigger value="weekend" className="flex-1">Weekend</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekdays" className="mt-4">
                  <p className="text-muted-foreground">Monday - Friday</p>
                  <p>9:00 AM - 6:00 PM</p>
                </TabsContent>
                
                <TabsContent value="weekend" className="mt-4">
                  <p className="text-muted-foreground">Saturday</p>
                  <p>10:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground mt-2">Sunday</p>
                  <p>Closed</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48369.55110603036!2d-74.02732273738875!3d40.7401542845793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1697032759241!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Romance Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}