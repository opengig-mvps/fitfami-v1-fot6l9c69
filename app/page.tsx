'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid, X, Image, Heart, Star, Camera, User, Info, FileText, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-red-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-red-600">
                    Welcome to FoodGram
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Share your favorite recipes and discover new culinary delights from food enthusiasts around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="h-10 bg-red-500 text-white px-8 shadow transition-colors hover:bg-red-600">
                    Get Started
                  </Button>
                  <Button variant="outline" className="h-10 border-red-500 text-red-500 px-8 shadow transition-colors hover:bg-red-100">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-600">Discover and Share</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore new recipes from all over the world and share your own culinary creations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Image className="h-12 w-12 text-red-600" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-red-600">Upload Photos</h3>
                  <p className="text-gray-700">
                    Showcase your recipes with beautiful photos.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <FileText className="h-12 w-12 text-red-600" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-red-600">Detailed Recipes</h3>
                  <p className="text-gray-700">Share step-by-step instructions for your recipes.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Heart className="h-12 w-12 text-red-600" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-red-600">Like and Save</h3>
                  <p className="text-gray-700">Save your favorite recipes for easy access.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-600">What Our Users Say</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from food enthusiasts who love using FoodGram.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-gray-500">Food Blogger</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "FoodGram has revolutionized the way I share my recipes. The community is amazing!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-gray-500">Home Chef</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "I love discovering new recipes on FoodGram! It's so easy to use and the recipes are fantastic."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-gray-500">Professional Chef</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "FoodGram is a game-changer for sharing my culinary creations. Highly recommend!"
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-red-600 p-6 md:py-12 w-full text-white">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;