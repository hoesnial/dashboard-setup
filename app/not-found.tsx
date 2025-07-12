import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardContent className="text-center p-12">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative">
              <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
            <p className="text-gray-500">
              Don't worry, even the best explorers sometimes take a wrong turn!
            </p>
          </div>

          {/* Floating Elements */}
          <div className="relative mb-8">
            <div className="flex justify-center space-x-4">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center animate-bounce">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center animate-bounce delay-100">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center animate-bounce delay-200">
                <Home className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-4">
                Or try one of these popular pages:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link href="/products">
                  <Button variant="ghost" size="sm">Products</Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" size="sm">About</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" size="sm">Contact</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Fun Fact:</strong> The first 404 error was discovered at CERN in 1992. 
              You're now part of internet history! 🚀
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}