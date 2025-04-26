import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import LEDSimulation from '../components/LEDSimulation';
import suImg from '../assets/images/su.png';
import oscarsImg from '../assets/images/oscars.png';

// C++ Code Snippet Component
const CppSnippet = ({ code }) => {
  return (
    <div className="bg-dark-gray rounded-lg p-4 overflow-auto text-sm">
      <pre className="text-white font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Project data
const projectsData = [
  {
    id: 1,
    title: 'AUC Student Union Backend System',
    description: 'A complete Express.js backend system for the AUC Student Union portal with user authentication, event management, and resource booking features.',
    tags: ['Backend', 'Data'],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'AWS'],
    github: 'https://github.com/aucsutech/su-backend-express',
    image: suImg,
    codeSnippet: `// REST API endpoints
app.get('/api/events', authenticateUser, async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ date: 1 })
      .populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings', authenticateUser, async (req, res) => {
  try {
    const { resourceId, date, startTime, endTime } = req.body;
    const newBooking = new Booking({
      resource: resourceId,
      user: req.user.id,
      date,
      startTime,
      endTime
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});`
  },
  {
    id: 2,
    title: 'Oscars Database App',
    description: 'An analytics application for Oscar-winning films using SQL backend with data visualization and complex query capabilities.',
    tags: ['Data', 'Backend'],
    technologies: ['SQL', 'MySQL', 'Express.js', 'Recharts'],
    github: 'https://github.com/aucsutech',
    image: oscarsImg,
    chartData: [
      { category: 'Drama', wins: 42 },
      { category: 'Comedy', wins: 12 },
      { category: 'Sci-Fi', wins: 8 },
      { category: 'Animation', wins: 14 },
      { category: 'Documentary', wins: 6 }
    ],
    codeSnippet: `// C++ Function to analyze Oscar data
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

struct FilmData {
    std::string title;
    int year;
    std::string category;
    bool winner;
};

std::vector<FilmData> getWinnersByDecade(const std::vector<FilmData>& films, 
                                         int startYear, 
                                         int endYear) {
    std::vector<FilmData> winners;
    
    for (const auto& film : films) {
        if (film.year >= startYear && film.year <= endYear && film.winner) {
            winners.push_back(film);
        }
    }
    
    // Sort winners by year
    std::sort(winners.begin(), winners.end(), 
              [](const FilmData& a, const FilmData& b) {
                  return a.year < b.year;
              });
    
    return winners;
}`
  },
  {
    id: 3,
    title: 'FPGA Verilog Mini-Demo',
    description: 'A demonstration of Verilog hardware design with basic circuit implementations and simulations compiled to WebAssembly.',
    tags: ['Hardware'],
    technologies: ['Verilog', 'C++', 'WebAssembly'],
    github: 'https://github.com/aucsutech',
    image: 'https://via.placeholder.com/600x400?text=FPGA+Verilog+Demo',
    codeSnippet: `// Verilog module for a simple LED blinker
module blink (
    input clk,
    input reset,
    output reg led
);

    reg [24:0] counter;
    
    always @(posedge clk or posedge reset) begin
        if (reset) begin
            counter <= 0;
            led <= 0;
        end else begin
            if (counter == 25000000) begin
                counter <= 0;
                led <= ~led;
            end else begin
                counter <= counter + 1;
            end
        end
    end
endmodule

// C++ wrapper for WebAssembly
extern "C" {
    bool led_state = false;
    int counter = 0;
    
    bool EMSCRIPTEN_KEEPALIVE simulateLEDBlink() {
        counter++;
        if (counter >= 50) {
            counter = 0;
            led_state = !led_state;
        }
        return led_state;
    }
}`
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on selected category
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.tags.includes(filter));

  // Project card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen py-24 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-blue text-center mb-2">
            My Projects
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            Explore my work across hardware and software development
          </p>

          {/* Filter buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['All', 'Hardware', 'Backend', 'Data'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? 'bg-electric-orange text-white' 
                    : 'bg-white text-dark-gray hover:bg-deep-blue hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* LED Simulation */}
          {(filter === 'All' || filter === 'Hardware') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="max-w-3xl mx-auto">
                <LEDSimulation />
              </div>
            </motion.div>
          )}

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="card hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-deep-blue mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full ${
                            tag === 'Hardware' ? 'bg-blue-100 text-blue-700' :
                            tag === 'Backend' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-deep-blue hover:text-electric-orange transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-deep-blue">{selectedProject.title}</h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-deep-blue"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedProject.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code Snippet */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Code Sample</h3>
                <CppSnippet code={selectedProject.codeSnippet} />
              </div>
              
              {/* Chart for Oscars project */}
              {selectedProject.chartData && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Oscar Wins by Category</h3>
                  <div className="h-72 bg-white p-4 rounded-lg shadow">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedProject.chartData}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="wins" fill="#0A2463" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects; 