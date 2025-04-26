import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import meImg from '../assets/images/me.png';

const Home = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-deep-blue">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/circuit-board.png')] bg-repeat opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold mb-4 font-montserrat"
              >
                Hi, I'm <span className="text-electric-orange">Yomna</span>
              </motion.h1>
              <motion.h2 
                variants={itemVariants}
                className="text-2xl md:text-3xl mb-6"
              >
                Computer Engineering @ AUC
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-xl mb-8"
              >
                Computer Engineering Student @ AUC --- Hardware Enthusiast --- Backend Developer --- Database Engineer
              </motion.p>
              <motion.div variants={itemVariants} className="flex space-x-4">
                <Link 
                  to="/projects" 
                  className="btn-primary"
                >
                  View My Projects
                </Link>
                <Link 
                  to="/contact" 
                  className="btn-secondary"
                >
                  Contact Me
                </Link>
              </motion.div>
            </div>

            {/* Flip Card */}
            <div className="md:w-1/2 flex justify-center">
              <motion.div 
                variants={itemVariants}
                className="w-64 h-64 md:w-80 md:h-80 relative perspective"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div 
                  className={`absolute w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front - Profile Photo */}
                  <div className="absolute w-full h-full backface-hidden">
                    <img 
                      src={meImg} 
                      alt="Yomna Hisham" 
                      className="w-full h-full object-cover rounded-full shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e";
                      }}
                    />
                    <div className="absolute bottom-0 right-0 p-2 bg-electric-orange rounded-full shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Back - Hardware Illustration */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-light-blue rounded-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <p className="text-white font-medium">Hardware Enthusiast</p>
                      <p className="text-white text-sm mt-2">Click to flip back</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="section-title text-center">About Me</h2>
            <p className="text-lg mb-8">
              As a Computer Engineering student at the American University in Cairo, I blend my passion for hardware with expertise in backend development and databases. My work spans from designing efficient server systems to implementing hardware solutions using languages like C++ and Verilog.
            </p>
            <p className="text-lg mb-8">
              I thrive in the intersection of physical computing and software development, creating solutions that bridge both worlds. Whether it's optimizing database performance or programming FPGAs, I'm always excited to tackle challenging projects.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.linkedin.com/in/yomna-othman/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn Profile
              </a>
              <a 
                href="https://github.com/aucsutech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                GitHub Projects
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 