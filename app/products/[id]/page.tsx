import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  ArrowLeft, 
  Check, 
  Zap, 
  Shield, 
  Smartphone,
  Users,
  BarChart,
  Settings,
  Download
} from 'lucide-react';

// Product data (in a real app, this would come from a database)
const products = {
  1: {
    id: 1,
    name: 'Dashboard Pro',
    description: 'Advanced analytics dashboard with real-time data visualization and custom reporting capabilities.',
    longDescription: 'Dashboard Pro is our flagship analytics solution that transforms raw data into actionable insights. With powerful visualization tools, real-time monitoring, and customizable reports, you can make data-driven decisions faster than ever before.',
    price: 'Rp 1.499.000/bulan',
    rating: 4.9,
    reviews: 1247,
    category: 'Analytics',
    icon: Zap,
    color: 'bg-blue-500',
    features: [
      'Real-time Analytics Dashboard',
      'Custom Report Builder',
      'API Integration & Webhooks',
      '24/7 Priority Support',
      'Advanced Data Filtering',
      'Export to Multiple Formats',
      'Team Collaboration Tools',
      'Mobile Responsive Design'
    ],
    specifications: {
      'Data Sources': '50+ integrations',
      'Update Frequency': 'Real-time',
      'Storage': 'Unlimited',
      'Users': 'Up to 25 team members',
      'API Calls': '100,000/month',
      'Support': '24/7 Priority'
    },
    screenshots: [
      'Dashboard Overview',
      'Custom Reports',
      'Data Visualization',
      'Team Management'
    ]
  },
  2: {
    id: 2,
    name: 'Security Suite',
    description: 'Comprehensive security solution with advanced threat detection and prevention systems.',
    longDescription: 'Security Suite provides enterprise-grade protection for your digital assets. Our AI-powered threat detection system monitors your infrastructure 24/7, while advanced encryption keeps your data safe from unauthorized access.',
    price: 'Rp 2.199.000/bulan',
    rating: 4.8,
    reviews: 892,
    category: 'Security',
    icon: Shield,
    color: 'bg-red-500',
    features: [
      'AI-Powered Threat Detection',
      'End-to-End Data Encryption',
      'Multi-Factor Authentication',
      'Detailed Audit Logs',
      'Vulnerability Scanning',
      'Incident Response Tools',
      'Compliance Reporting',
      'Security Training Modules'
    ],
    specifications: {
      'Threat Detection': 'AI-powered',
      'Encryption': 'AES-256',
      'Compliance': 'SOC 2, GDPR, HIPAA',
      'Monitoring': '24/7 automated',
      'Response Time': '< 5 minutes',
      'Uptime': '99.99% SLA'
    },
    screenshots: [
      'Security Dashboard',
      'Threat Analysis',
      'Compliance Reports',
      'Incident Management'
    ]
  },
  3: {
    id: 3,
    name: 'Mobile App Builder',
    description: 'No-code platform to build beautiful mobile applications for iOS and Android platforms.',
    longDescription: 'Mobile App Builder empowers anyone to create professional mobile applications without coding. Our intuitive drag-and-drop interface, combined with powerful features and seamless app store publishing, makes mobile app development accessible to everyone.',
    price: 'Rp 1.199.000/bulan',
    rating: 4.7,
    reviews: 2156,
    category: 'Development',
    icon: Smartphone,
    color: 'bg-green-500',
    features: [
      'Drag & Drop Interface',
      'Cross-Platform Development',
      'App Store Publishing',
      'Built-in Analytics',
      'Push Notifications',
      'Offline Functionality',
      'Custom Branding',
      'Template Library'
    ],
    specifications: {
      'Platforms': 'iOS, Android, Web',
      'Templates': '100+ pre-built',
      'Publishing': 'Automated',
      'Analytics': 'Built-in',
      'Storage': '10GB included',
      'Apps': 'Unlimited'
    },
    screenshots: [
      'App Builder Interface',
      'Template Gallery',
      'Publishing Dashboard',
      'Analytics Overview'
    ]
  }
};

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products[params.id as keyof typeof products];
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Acme Dashboard`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products[params.id as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-xl ${product.color}`}>
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl">{product.name}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {product.description}
                      </CardDescription>
                      <div className="flex items-center space-x-4 mt-4">
                        <Badge variant="secondary">{product.category}</Badge>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Product Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.longDescription}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-900">{key}</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="screenshots" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Screenshots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.screenshots.map((screenshot, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-48 flex items-center justify-center">
                          <div className="text-center">
                            <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 font-medium">{screenshot}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl">Get Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{product.price}</div>
                  <p className="text-gray-600">per bulan, ditagih tahunan</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Start Free Trial
                  </Button>
                  <Button className="w-full" variant="outline" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                  <Link href="/contact">
                    <Button className="w-full" variant="ghost" size="lg">
                      Contact Sales
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our team is here to help you get the most out of {product.name}.
                </p>
                <div className="space-y-2">
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full">
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}