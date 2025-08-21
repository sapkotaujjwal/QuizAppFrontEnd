import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Star,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  User,
  GraduationCap,
  Shield,
  MessageCircle,
  Bus,
} from "lucide-react";

const SchoolDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({});

  // Sample data based on the schema
  const schoolData = {
    logo: {
      secure_url: "https://scholib.com/images/logo.png",
      blurHash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4",
    },
    sName: "KESS",
    name: "Kathmandu Excellence Secondary School",
    studentsNo: 1250,
    address: "Baneshwor, Kathmandu, Nepal",
    estd: 2010,
    phone: [9841234567],
    email: ["info@kess.edu.np"],
    ratings: 4.5,
    noOfReviews: 128,
    studentsTaught: 3500,
    images: [
      {
        secure_url:
          "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2025/s2.jpg",
      },
      {
        secure_url:
          "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2025/s2.jpg",
      },
      {
        secure_url:
          "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2025/s2.jpg",
      },
    ],
    facilities: [
      "Modern Computer Lab",
      "Science Laboratory",
      "Sports Complex",
      "Library & Resource Center",
      "Cafeteria",
      "Medical Room",
      "Transportation",
    ],
    programs: [
      "Nursery to Grade 10",
      "Science Stream",
      "Management Stream",
      "Humanities Stream",
    ],
    principle: {
      image: {
        secure_url:
          "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2025/s2.jpg",
      },
      name: "Dr. Rajesh Kumar Sharma",
      quote:
        "Education is the most powerful weapon which you can use to change the world. At KESS, we are committed to nurturing future leaders.",
    },
    social: {
      facebook: "https://facebook.com/kess",
      twitter: "https://twitter.com/kess",
      instagram: "https://instagram.com/kess",
      youtube: "https://youtube.com/kess",
    },
    coordinates: "27.7172° N, 85.3240° E",
    text1:
      "Welcome to Kathmandu Excellence Secondary School, a place of learning, inspiration, and community. At KESS, we believe that education is the cornerstone of a bright future. Our dedicated faculty and staff work tirelessly to create an environment where students can excel academically and grow personally.",
    text2:
      "Since our inception in 2010, KESS has been dedicated to delivering an exceptional education. With a rich history of nurturing young minds and fostering a spirit of curiosity, we've continually evolved to meet the changing needs of our students.",
    text3:
      "We believe in the extraordinary potential that resides within each and every student. Our commitment is to nurture that potential and empower you to reach your highest aspirations.",
    teamText:
      "Our biggest strength are the people who are working their level best to make us to the top and serve the lives around us.",
    policies: [
      "Promoting regular attendance for student success.",
      "Defining expected behavior and consequences.",
      "Creating a safe, respectful environment.",
      "Setting dress expectations and guidelines.",
      "Explaining grading and assessment methods.",
    ],
    reviews: [
      {
        name: "Priya Sharma",
        rating: 5,
        message:
          "Excellent school with dedicated teachers. My child has shown remarkable improvement.",
        date: "2024-03-15",
      },
      {
        name: "Amit Thapa",
        rating: 4,
        message:
          "Good facilities and teaching quality. Would recommend to other parents.",
        date: "2024-03-10",
      },
    ],
    busFee: [
      {
        location: "Baneshwor Route",
        amounts: [{ date: "2024", amount: 2500 }],
        active: true,
      },
      {
        location: "Patan Route",
        amounts: [{ date: "2024", amount: 3000 }],
        active: true,
      },
    ],
    course: [
      {
        class: "Grade 10",
        seatsAvailable: 45,
        subjects: [
          "Mathematics",
          "Science",
          "English",
          "Nepali",
          "Social Studies",
        ],
        fees: [
          { title: "Tuition Fee", amount: 15000 },
          { title: "Exam Fee", amount: 2000 },
        ],
        duration: 12,
        sessions: ["Morning", "Day"],
      },
    ],
    faq: [
      {
        question: "What are the admission requirements?",
        answer:
          "Students need to pass our entrance exam and provide previous academic records.",
      },
      {
        question: "Do you provide transportation?",
        answer:
          "Yes, we have bus services covering major routes in Kathmandu valley.",
      },
    ],
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="">
      <div className="bg-white shadow1 border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-4 flex space-x-4 items-center justify-left">
              {/* Logo Section */}
              <div className="flex-shrink-0">
                <img
                  src={schoolData.logo.secure_url}
                  alt="School Logo"
                  className="w-22 h-22 rounded-xl shadow1 border-slate-200 shadow-sm object-cover"
                />
              </div>

              <div className="">
                <h1 className="text-lg md:text-2xl font-bold text-slate-800 mb-1">
                  {schoolData.name}
                </h1>
                <p className="text-md text-slate-600 font-medium">
                  {schoolData.sName}
                </p>
              </div>
            </div>

            {/* School Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    ESTABLISHED
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {schoolData.estd}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">STUDENTS</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {schoolData.studentsNo}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-medium">LOCATION</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {schoolData.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="shadow1 rounded-sm p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <TabButton id="overview" label="Overview" icon={BookOpen} />
        <TabButton id="academics" label="Academics" icon={GraduationCap} />
        <TabButton id="facilities" label="Facilities" icon={Award} />
        <TabButton id="administration" label="Admin" icon={User} />
        <TabButton id="policies" label="Policies" icon={Shield} />
        <TabButton id="reviews" label="Reviews" icon={MessageCircle} />
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* School Images */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {schoolData.images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={image.secure_url}
                    alt={`School Image ${index + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">About Our School</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {schoolData.text1}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {schoolData.text2}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Current Students */}
              <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="mb-2">
                    <p className="text-xl font-bold text-slate-800 mb-1">
                      {schoolData.studentsNo}
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Current Students
                    </p>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Students Taught */}
              <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="mb-2">
                    <p className="text-xl font-bold text-slate-800 mb-1">
                      {schoolData.studentsTaught}
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Students Taught
                    </p>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>

              {/* Years of Excellence */}
              <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="mb-2">
                    <p className="text-xl font-bold text-slate-800 mb-1">
                      {new Date().getFullYear() - schoolData.estd}
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Years of Excellence
                    </p>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Average Rating */}
              <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-amber-100/50 transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="mb-2">
                    <p className="text-xl font-bold text-slate-800 mb-1">
                      {schoolData.ratings}
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Average Rating
                    </p>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information - Modern Redesign */}
            <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow1 border-slate-200/60 rounded-2xl p-8 shadow-lg shadow-slate-200/50 backdrop-blur-sm overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-violet-100/30 to-purple-100/30 rounded-full blur-xl translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                {/* Header with animated underline */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                    Get In Touch
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Details */}
                  <div className="space-y-6">
                    <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-md hover:shadow-slate-200/40">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/40 group-hover:scale-105 transition-transform duration-300">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-500 mb-1">
                          Call Us
                        </p>
                        <p className="text-slate-800 font-semibold group-hover:text-blue-600 transition-colors duration-300">
                          {schoolData.phone[0]}
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-md hover:shadow-slate-200/40">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200/40 group-hover:scale-105 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-500 mb-1">
                          Email Us
                        </p>
                        <p className="text-slate-800 font-semibold group-hover:text-emerald-600 transition-colors duration-300 break-all">
                          {schoolData.email[0]}
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-md hover:shadow-slate-200/40">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200/40 group-hover:scale-105 transition-transform duration-300">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-500 mb-1">
                          Visit Us
                        </p>
                        <p className="text-slate-800 font-semibold group-hover:text-purple-600 transition-colors duration-300 leading-relaxed">
                          {schoolData.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex flex-col justify-center">
                    <div className="text-center lg:text-left mb-6">
                      <h4 className="text-lg font-bold text-slate-800 mb-2">
                        Connect With Us
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Follow our journey and stay updated
                      </p>
                    </div>

                    <div className="space-y-3">
                      <a
                        href="https://facebook.com/yourschool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 bg-white/60 hover:bg-white/80 shadow1 border-slate-200 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-slate-200/40 group"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Facebook className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-xs lg:text-md font-medium group-hover:text-blue-600 transition-colors">
                            facebook.com/yourschool
                          </p>
                        </div>
                      </a>

                      <a
                        href="https://twitter.com/yourschool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 bg-white/60 hover:bg-white/80 shadow1 border-slate-200 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-slate-200/40 group"
                      >
                        <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Twitter className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-xs lg:text-md font-medium group-hover:text-sky-600 transition-colors">
                            twitter.com/yourschool
                          </p>
                        </div>
                      </a>

                      <a
                        href="https://instagram.com/yourschool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 bg-white/60 hover:bg-white/80 shadow1 border-slate-200 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-slate-200/40 group"
                      >
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Instagram className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-xs lg:text-md font-medium group-hover:text-pink-600 transition-colors">
                            instagram.com/yourschool
                          </p>
                        </div>
                      </a>

                      <a
                        href="https://youtube.com/yourschool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 bg-white/60 hover:bg-white/80 shadow1 border-slate-200 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-slate-200/40 group"
                      >
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Youtube className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-xs lg:text-md font-medium group-hover:text-red-600 transition-colors">
                            youtube.com/yourschool
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "academics" && (
          <div className="space-y-6">
            {/* Programs */}
            <div className="bg-white shadow1 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Academic Programs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schoolData.programs.map((program, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="font-medium">{program}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Details */}
            <div className="bg-white shadow1 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Course Information</h3>
              {schoolData.course.map((course, index) => (
                <div key={index} className="shadow1 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-lg">{course.class}</h4>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {course.seatsAvailable} seats available
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Subjects:</h5>
                      <div className="flex flex-wrap gap-2">
                        {course.subjects.map((subject, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 px-2 py-1 rounded text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Fee Structure:</h5>
                      <div className="space-y-1">
                        {course.fees.map((fee, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            <span>{fee.title}:</span>
                            <span className="font-medium">
                              Rs. {fee.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Transportation */}
            <div className="bg-white shadow1 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Bus className="w-5 h-5 mr-2" />
                Transportation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schoolData.busFee.map((route, index) => (
                  <div key={index} className="shadow1 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{route.location}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          route.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {route.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">
                        Monthly Fee:{" "}
                      </span>
                      <span className="font-semibold">
                        Rs. {route.amounts[0]?.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "facilities" && (
          <div className="bg-white shadow1 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">School Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schoolData.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Award className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "administration" && (
          <div className="space-y-6">
            {/* Principal Section */}
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Principal's Message
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Principal Image */}
                <div className="flex-shrink-0 relative">
                  <div className="relative">
                    <img
                      src={schoolData.principle.image.secure_url}
                      alt="Principal"
                      className="w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Principal Name with Title */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-1">
                      {schoolData.principle.name}
                    </h4>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    {/* Large opening quote */}
                    <div className="absolute -top-4 -left-2 text-4xl text-blue-200 font-serif leading-none select-none">
                      "
                    </div>

                    <blockquote className="relative text-slate-700 text-md leading-relaxed font-medium italic pl-8 pr-4">
                      {schoolData.principle.quote}
                    </blockquote>

                    {/* Large closing quote */}
                    <div className="absolute -bottom-8 right-0 text-4xl text-blue-200 font-serif leading-none select-none">
                      "
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white shadow1 rounded-xl p-6">
              <p className="text-gray-700">{schoolData.teamText}</p>
            </div>

            {/* Student Message */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Message to Students</h3>
              <p className="text-gray-700 leading-relaxed">
                {schoolData.text3}
              </p>
            </div>
          </div>
        )}

        {activeTab === "policies" && (
          <div className="bg-white shadow1 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">School Policies</h3>
            <div className="space-y-3">
              {schoolData.policies.map((policy, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{policy}</span>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {schoolData.faq.map((item, index) => (
                  <div key={index} className="shadow1 rounded-lg">
                    <button
                      onClick={() => toggleSection(`faq-${index}`)}
                      className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium">{item.question}</span>
                      {expandedSections[`faq-${index}`] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    {expandedSections[`faq-${index}`] && (
                      <div className="px-4 pb-4 text-gray-700">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white shadow1 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Student & Parent Reviews</h3>
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  {renderStars(schoolData.ratings)}
                  <span className="ml-2 font-semibold">
                    {schoolData.ratings}/5
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {schoolData.noOfReviews} total reviews
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {schoolData.reviews.map((review, index) => (
                <div key={index} className="shadow1 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDetails;
