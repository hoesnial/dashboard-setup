'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Home, 
  BarChart3, 
  Package, 
  Settings, 
  Info, 
  Phone, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { 
    name: 'Home', 
    href: '/', 
    icon: Home,
    description: 'Dashboard utama'
  },
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: BarChart3,
    description: 'Analytics & Reports'
  },
  { 
    name: 'Products', 
    href: '/products', 
    icon: Package,
    description: 'Katalog produk'
  },
  { 
    name: 'Manage Products', 
    href: '/products/manage', 
    icon: Settings,
    description: 'Kelola produk',
    badge: 'Admin'
  },
  { 
    name: 'About', 
    href: '/about', 
    icon: Info,
    description: 'Tentang perusahaan'
  },
  { 
    name: 'Contact', 
    href: '/contact', 
    icon: Phone,
    description: 'Hubungi kami'
  },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white lg:border-r lg:border-gray-200 lg:shadow-sm",
        isCollapsed ? "lg:w-16" : "lg:w-72",
        className
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Acme</span>
            </Link>
          )}
          
          {isCollapsed && (
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-md">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 hover:bg-gray-200 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm',
                  isCollapsed && 'justify-center px-3'
                )}
                title={isCollapsed ? item.name : undefined}
              >
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                )}
                <item.icon className={cn(
                  "flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600",
                  isCollapsed ? "w-5 h-5" : "w-5 h-5"
                )} />
                
                {!isCollapsed && (
                  <>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-tight">
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 bg-gray-50/30">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Need Help?
              </h4>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Contact our support team
              </p>
              <Link href="/contact">
                <Button size="sm" className="w-full text-xs font-medium shadow-sm">
                  Get Support
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileSidebar />
    </>
  );
}

function MobileSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden fixed top-4 left-4 z-50">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        {/* Mobile Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Acme</span>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full relative',
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                )}
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-400"
                )} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/30">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Need Help?
            </h4>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Contact our support team
            </p>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full text-xs font-medium shadow-sm">
                Get Support
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}