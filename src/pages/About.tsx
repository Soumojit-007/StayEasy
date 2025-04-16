
import React from "react";
import { motion } from "framer-motion";
import { Info, Users, Building, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About <span className="text-primary">Stay Easy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Redefining hospitality with blockchain technology and creating memorable experiences for travelers around the world.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Luxury hotel room" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2023, Stay Easy emerged from a vision to transform the hospitality industry by leveraging blockchain technology to create a more transparent, efficient, and user-centric booking experience.
              </p>
              <p className="text-gray-600">
                Our team of hospitality experts and tech innovators came together with a shared mission: to remove the friction from travel accommodation and empower both travelers and property owners with a platform built on trust and simplicity.
              </p>
              <Button asChild className="mt-4 w-fit">
                <Link to="/explore">
                  Explore Our Properties <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Stay Easy
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Info className="h-10 w-10 text-indigo-500" />,
                title: "Transparency",
                description: "We believe in complete transparency in pricing, property information, and reviews."
              },
              {
                icon: <Users className="h-10 w-10 text-indigo-500" />,
                title: "Community",
                description: "We foster a global community of travelers who share experiences and recommendations."
              },
              {
                icon: <Building className="h-10 w-10 text-indigo-500" />,
                title: "Quality",
                description: "We curate only the highest quality accommodations that meet our strict standards."
              },
              {
                icon: <Award className="h-10 w-10 text-indigo-500" />,
                title: "Innovation",
                description: "We continuously innovate to improve the travel experience through technology."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-indigo-50 rounded-full">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CEO Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Meet Our CEO</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary leader behind Stay Easy
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="overflow-hidden">
                    <img 
                      src="/lovable-uploads/ff59d733-9941-471e-9950-0083414e12c1.jpg" 
                      alt="CEO Portrait" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">Soumojit</h3>
                    <p className="text-indigo-600 text-lg mb-4">CEO & Founder</p>
                    <p className="text-gray-600 mb-4">
                      With over 15 years of experience in the hospitality and technology sectors, Soumojit has led the vision for Stay Easy from its inception. 
                    </p>
                    <p className="text-gray-600 mb-4">
                      Soumojit's passion for travel and innovative solutions has driven the company's mission to transform how people book and experience accommodations worldwide.
                    </p>
                    <p className="text-gray-600">
                      "My vision is to create a platform where travelers can find their perfect stay with complete confidence and transparency, while property owners can showcase their unique offerings to a global audience."
                    </p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-indigo-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Stay Easy?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied travelers who have discovered a better way to book accommodations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="default" className="bg-white text-indigo-600 hover:bg-gray-100">
                <Link to="/explore">
                  Find Your Next Stay
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-indigo-700">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
