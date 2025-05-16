import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, ExternalLink, ChevronLeftCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface Subject {
  id: string;
  title: string;
  description: string;
  links: {
    title: string;
    url: string;
  }[];
}

const subjects: Subject[] = [
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'JavaScript is a versatile, high-level programming language that enables interactive functionality on web pages. It is a core technology alongside HTML and CSS in web development. JavaScript allows developers to implement dynamic features such as form validation, animations, real-time updates, and more. It runs in the browser, which means it can interact with the Document Object Model (DOM) to update content without requiring a page reload. Modern JavaScript has grown significantly with the introduction of ES6+ features like arrow functions, promises, and classes, making it more powerful and developer-friendly. It is also used in backend development via Node.js.',
    links: [
      {
        title: 'MDN JavaScript Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'
      },
      {
        title: 'JavaScript.info',
        url: 'https://javascript.info/'
      }
    ]
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Python is a widely-used, high-level programming language known for its simplicity and readability. It is often the first language taught to beginners because of its clean syntax and broad applicability. Python is used in various fields, including web development, data science, machine learning, automation, and scripting. Its extensive standard library and vast ecosystem of third-party packages make it ideal for both quick scripts and large-scale applications. Python\'s community is very active, making it easy to find support and learning resources. The language emphasizes code readability and encourages writing clean, reusable code through its object-oriented approach.',
    links: [
      {
        title: 'Official Python Documentation',
        url: 'https://docs.python.org/3/'
      },
      {
        title: 'Real Python',
        url: 'https://realpython.com/'
      }
    ]
  },
  {
    id: 'html',
    title: 'HTML',
    description: 'HTML (HyperText Markup Language) is the foundational language used to structure content on the web. Every web page you see online is built using HTML elements that define paragraphs, headings, links, images, and other types of content. HTML works closely with CSS and JavaScript to create visually appealing and interactive experiences. It uses tags like <div>, <h1>, <a>, and many others to organize the layout and semantics of web pages. With advancements like HTML5, developers can now embed video, audio, and canvas content natively. Understanding HTML is essential for anyone pursuing a career in web development or digital design.',
    links: [
      {
        title: 'W3Schools HTML Tutorial',
        url: 'https://www.w3schools.com/html/'
      },
      {
        title: 'MDN HTML Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
      }
    ]
  },
  {
    id: 'mathematics',
    title: 'Mathematics',
    description: 'Mathematics is a universal language that underpins nearly every scientific and technological field. It involves the study of numbers, structures, patterns, and relationships, ranging from simple arithmetic to complex calculus and abstract algebra. Mathematics develops critical thinking and problem-solving skills, which are valuable in computer science, engineering, economics, and more. Subjects like geometry help in understanding spatial relationships, while statistics and probability are crucial in data analysis and machine learning. Learning mathematics also trains the brain in logical reasoning and precision. Whether you\'re analyzing algorithms or designing buildings, math plays an essential role in accurate and efficient outcomes.',
    links: [
      {
        title: 'Khan Academy Mathematics',
        url: 'https://www.khanacademy.org/math'
      },
      {
        title: 'Paul\'s Online Math Notes',
        url: 'https://tutorial.math.lamar.edu/'
      }
    ]
  },
  {
    id: 'english',
    title: 'English',
    description: 'English is a global language used for communication in business, education, science, and media. Mastery of English enhances a person\'s ability to express ideas, read academic literature, and participate in global discussions. English includes grammar, vocabulary, reading comprehension, and writing. It is essential not only for communication but also for career opportunities and academic advancement. Proficiency in English improves one\'s ability to write emails, understand manuals, and collaborate internationally. Literature and language studies also foster critical thinking, empathy, and cultural awareness by analyzing texts, narratives, and arguments from various perspectives and historical contexts.',
    links: [
      {
        title: 'Grammarly Blog',
        url: 'https://www.grammarly.com/blog'
      },
      {
        title: 'BBC Learning English',
        url: 'https://www.bbc.co.uk/learningenglish'
      }
    ]
  },
  {
    id: 'history',
    title: 'History',
    description: 'History is the study of past events, societies, and civilizations. It helps us understand how the world evolved, how cultures interacted, and how political systems and ideologies shaped nations. By learning history, we gain insights into patterns of conflict, cooperation, progress, and change. Studying historical events teaches critical analysis and helps individuals make informed decisions in current contexts. It also builds a sense of identity and heritage, fostering appreciation for the struggles and achievements of previous generations. Topics include ancient civilizations, world wars, revolutions, and the development of democratic institutions.',
    links: [
      {
        title: 'History.com',
        url: 'https://www.history.com/'
      },
      {
        title: 'Open Yale Courses - History',
        url: 'https://oyc.yale.edu/history'
      }
    ]
  }
];

const SubjectOverview: React.FC = () => {
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  return (
    <div className="relative flex">
      <Sidebar className={cn(
        "flex-shrink-0 border-r border-border transition-all duration-300",
        isCollapsed ? "w-0 opacity-0" : "w-80 opacity-100"
      )}>
        <SidebarContent>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-foreground" />
                <h2 className="text-sm font-semibold">Subject Overview</h2>
              </div>
            </div>
          </div>

          <div className="py-2">
            {subjects.map((subject) => (
              <div key={subject.id} className="border-b border-border/50 last:border-0">
                <button
                  onClick={() => toggleSubject(subject.id)}
                  className={cn(
                    "flex items-center justify-between w-full p-3 text-left",
                    "hover:bg-accent hover:text-accent-foreground transition-colors",
                    "focus:outline-none focus:bg-accent focus:text-accent-foreground"
                  )}
                >
                  <span className="text-sm font-medium">{subject.title}</span>
                  {expandedSubjects.includes(subject.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {expandedSubjects.includes(subject.id) && (
                  <div className="px-3 pb-3">
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {subject.description}
                    </p>
                    <div className="space-y-2">
                      {subject.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-2 text-sm",
                            "text-primary hover:text-primary/80 transition-colors group",
                            "focus:outline-none focus:text-primary/80"
                          )}
                        >
                          <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SidebarContent>
      </Sidebar>

      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -right-4 top-4 z-10 h-8 w-8 rounded-full border bg-background",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeftCircle
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isCollapsed && "rotate-180"
          )}
        />
      </Button>
    </div>
  );
};

export default SubjectOverview; 