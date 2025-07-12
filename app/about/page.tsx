import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Acme Dashboard',
  description: 'Learn more about our company, mission, and values.',
};

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Team Members', value: '50+' },
    { icon: Target, label: 'Projects Completed', value: '200+' },
    { icon: Award, label: 'Awards Won', value: '15' },
    { icon: Heart, label: 'Happy Clients', value: '500+' },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions.',
    },
    {
      title: 'Quality',
      description: 'Excellence is not just a goal, it\'s our standard in everything we do.',
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication.',
    },
    {
      title: 'Integrity',
      description: 'Honesty and transparency guide all our business relationships.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Acme</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a passionate team of innovators dedicated to creating exceptional 
            digital experiences that transform businesses and delight users worldwide.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
              To empower businesses with innovative technology solutions that drive growth, 
              enhance efficiency, and create meaningful connections between companies and their customers. 
              We strive to be the catalyst that transforms ideas into reality.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Meet Our Team</CardTitle>
            <CardDescription className="text-center text-lg">
              The brilliant minds behind our success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Johnson', role: 'CEO & Founder', expertise: 'Strategy' },
                { name: 'Michael Chen', role: 'CTO', expertise: 'Technology' },
                { name: 'Emily Rodriguez', role: 'Head of Design', expertise: 'UX/UI' },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <Badge variant="secondary" className="mt-2">{member.expertise}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}