import recruiterImage from 'figma:asset/a5779d4c9f02714b8efcda9c85572d52cba3a910.png';
import enthusiastImage from 'figma:asset/552085965b4d966b10bd07cdaa14f764ff91d11d.png';
import marketerImage from 'figma:asset/d58639c0381c24e78dff1230902bd5692fca170e.png';
import strangerImage from 'figma:asset/c7096f99635983ea1558fa9736b9c9c05f4e3165.png';
import prospectImage from 'figma:asset/ce87ad8d1a4d312a6ce684e06b4caf2deba9f33f.png';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from './ui/alert-dialog';

interface Profile {
  id: string;
  name: string;
  emoji?: string;
  image?: string;
  color: string;
}

interface ProfileSelectionProps {
  onSelectProfile: (profileId: string) => void;
}

export function ProfileSelection({ onSelectProfile }: ProfileSelectionProps) {
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsManageDialogOpen(false);
      setIsSuccessDialogOpen(true);
      setName('');
      setEmail('');
    }
  };

  const profiles: Profile[] = [
    {
      id: 'recruiter',
      name: 'Recruiter',
      image: recruiterImage,
      color: '#E6A817', // Yellow/Gold
    },
    {
      id: 'fan',
      name: 'Enthusiast',
      image: enthusiastImage,
      color: '#D84315', // Orange/Red
    },
    {
      id: 'marketer',
      name: 'Marketer',
      image: marketerImage,
      color: '#E50914', // Netflix Red
    },
    {
      id: 'stranger',
      name: 'Stranger',
      image: strangerImage,
      color: '#E50914', // Netflix Red
    },
    {
      id: 'business',
      name: 'Prospect',
      image: prospectImage,
      color: '#46C3A6', // Green
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#141414] px-4 md:px-8 py-12 md:py-16">
      <div className="w-full max-w-[1200px]">
        {/* Netflix-style heading */}
        <h1 className="text-white text-center mb-12 md:mb-14 animate-fade-in text-4xl md:text-6xl"
            style={{ 
              fontWeight: '500'
            }}>
          Who's Watching?
        </h1>

        {/* Profile grid - 2x2 on mobile, single row on desktop */}
        <div className="grid grid-cols-2 md:flex md:flex-row justify-center items-start gap-4 md:gap-5 lg:gap-6 xl:gap-8 mb-8 md:mb-14 max-w-md md:max-w-none mx-auto">
          {profiles.map((profile, index) => (
            <button
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
              className="group flex flex-col items-center gap-3 md:gap-2.5 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Profile Avatar - Square on mobile, Netflix proportions */}
              <div
                className="w-[140px] h-[140px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] xl:w-[155px] xl:h-[155px] rounded-lg md:rounded-md overflow-hidden border-[3px] border-transparent group-hover:border-white transition-all duration-200"
                style={{ backgroundColor: profile.image ? 'transparent' : profile.color }}
              >
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl md:text-5xl lg:text-6xl">
                    {profile.emoji}
                  </div>
                )}
              </div>
              
              {/* Profile Name - larger, more visible */}
              <span className="text-[#808080] group-hover:text-white transition-colors duration-200 text-center max-w-[155px] text-base md:text-lg"
                    style={{
                      fontWeight: '400'
                    }}>
                {profile.name}
              </span>
            </button>
          ))}
        </div>

        {/* Manage Profiles Button */}
        <div className="text-center mt-12 md:mt-16">
          <button 
            onClick={() => setIsManageDialogOpen(true)}
            className="px-6 md:px-8 py-2.5 border border-[#808080] text-[#808080] hover:border-white hover:text-white transition-all duration-200 uppercase tracking-widest text-sm md:text-base"
            style={{
              fontWeight: '400',
              letterSpacing: '2.5px'
            }}>
            Manage Profiles
          </button>
        </div>
      </div>

      {/* Create Profile Dialog */}
      <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
        <DialogContent className="bg-[#141414] border border-gray-800 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Profile</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your details to create a new profile and receive verification.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#333] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#E50914]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#333] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#E50914]"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsManageDialogOpen(false)}
                className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#E50914] text-white hover:bg-[#c00913]"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Alert Dialog */}
      <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <AlertDialogContent className="bg-[#141414] border border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Check Your Email</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction 
            className="bg-[#E50914] text-white hover:bg-[#c00913]"
            onClick={() => setIsSuccessDialogOpen(false)}
          >
            Got it
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}