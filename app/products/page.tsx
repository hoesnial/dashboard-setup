import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products - Acme Dashboard',
  description: 'Explore our range of innovative products and solutions.',
};

const products = [
  {
    id: 1,
    name: 'Dashboard Pro',
    description: 'Advanced analytics dashboard with real-time data visualization and custom reporting.',
    price: 'Rp 1.499.000/bulan',
    rating: 4.9,
    category: 'Analytics',
    features: ['Real-time Analytics', 'Custom Reports', 'API Integration', '24/7 Support'],
    icon: Zap,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Security Suite',
    description: 'Comprehensive security solution with advanced threat detection and prevention.',
    price: 'Rp 2.199.000/bulan',
    rating: 4.8,
    category: 'Security',
    features: ['Threat Detection', 'Data Encryption', 'Access Control', 'Audit Logs'],
    icon: Shield,
    color: 'bg-red-500',
  },
  {
    id: 3,
    name: 'Mobile App Builder',
    description: 'No-code platform to build beautiful mobile applications for iOS and Android.',
    price: 'Rp 1.199.000/bulan',
    rating: 4.7,
    category: 'Development',
    features: ['Drag & Drop Builder', 'Cross Platform', 'App Store Publishing', 'Analytics'],
    icon: Smartphone,
    color: 'bg-green-500',
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-purple-600">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our suite of powerful tools designed to streamline your workflow 
            and accelerate your business growth.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${product.color}`}>
                    <product.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rating */}
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
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500">per month</span>
                  </div>
                  <div className="space-y-2">
                    <Link href={`/products/${product.id}`}>
                      <Button className="w-full" variant="default">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button className="w-full" variant="outline">
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mt-16">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust our products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}