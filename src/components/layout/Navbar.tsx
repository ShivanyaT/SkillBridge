
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skill-purple to-skill-indigo flex items-center justify-center">
              <span className="font-bold text-white">SB</span>
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:inline-block">SkillBridge</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90" asChild>
            <Link to="/register">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
