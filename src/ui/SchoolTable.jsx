import {
  School,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  User,
  Star,
  Award,
  Users,
} from "lucide-react";

export default function SchoolTable({ schools = [], clickFunc }) {
  // Sample data if no schools provided
  const sampleSchools = [
    {
      id: 1,
      name: "Greenwood International School",
      address: "123 Harmony Road, Bangalore, Karnataka 560001",
      phone: "+91 98765 43210",
      email: "info@greenwoodschool.in",
      website: "www.greenwoodschool.in",
      principal: "Dr. Radhika Menon",
      registeredOn: "2081/12/12",
      expiresOn: "2081/12/12",
      students: 1200,
      staffs: 15,
      courses: 12,
      rating: 4.8,
      reviews: 324,
      programs: ["Nursery to class 10", "+2 Science & Management", "BBA"],
    },
    {
      id: 2,
      name: "Sunrise Academy",
      address: "456 Education Street, Mumbai, Maharashtra 400001",
      phone: "+91 98765 43211",
      email: "contact@sunriseacademy.in",
      website: "www.sunriseacademy.in",
      principal: "Prof. Amit Sharma",
      registeredOn: "2080/05/15",
      expiresOn: "2085/05/15",
      students: 800,
      staffs: 12,
      courses: 8,
      rating: 4.6,
      reviews: 256,
      programs: ["Pre-K to Grade 12", "IB Program"],
    },
    {
      id: 3,
      name: "Cambridge Heights School",
      address: "789 Knowledge Park, Delhi, Delhi 110001",
      phone: "+91 98765 43212",
      email: "admin@cambridgeheights.in",
      website: "www.cambridgeheights.in",
      principal: "Ms. Priya Gupta",
      registeredOn: "2079/08/20",
      expiresOn: "2084/08/20",
      students: 1500,
      staffs: 20,
      courses: 15,
      rating: 4.9,
      reviews: 412,
      programs: ["KG to Class 12", "CBSE", "Cambridge"],
    },
  ];

  const schoolData = schools.length > 0 ? schools : sampleSchools;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mx-auto my-8">
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-xl lg:shadow-lg border border-white/50 backdrop-blur-sm overflow-hidden">
        <div className="p-0 lg:p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 flex items-center">
            <School className="w-8 h-8 text-blue-600 mr-3" />
            Schools Directory
          </h2>

          <div className="overflow-x-auto w-full pb-2 scrollbar1">
            <table className="w-full  bg-white rounded-lg lg:shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-100">
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[200px]">
                    School Info
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[180px]">
                    Contact
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[250px]">
                    Address
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[150px]">
                    Principal
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[120px]">
                    Stats
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[120px]">
                    Rating
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[150px]">
                    Registration
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900 min-w-[200px]">
                    Programs
                  </th>
                </tr>
              </thead>
              <tbody>
                {schoolData.map((school, index) => (
                  <tr
                    key={school.id || index}
                    onClick={()=>{clickFunc()}}
                    className="border-b cursor-pointer border-gray-100 hover:bg-blue-50 hover:shadow-md hover:scale-[1.001] transition-all duration-300 ease-in-out"
                  >
                    {/* School Info */}
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-2">
                          <School className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {school.name}
                          </div>
                          <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full mt-1 text-center">
                            <p className="hidden md:block font-bold">
                              Expires On{" "}
                            </p>
                            {school.expiresOn}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-900">
                            {school.phone}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600 truncate max-w-[120px]">
                            {school.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-purple-600" />
                          <a
                            href={`https://${school.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple-600 hover:underline truncate max-w-[120px]"
                          >
                            {school.website}
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="p-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-900">
                          {school.address}
                        </span>
                      </div>
                    </td>

                    {/* Principal */}
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {school.principal}
                        </span>
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-900">
                            {school.students}
                          </span>
                          <span className="text-xs text-gray-600">
                            students
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-gray-900">
                            {school.staffs}
                          </span>
                          <span className="text-xs text-gray-600">staff</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <School className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-semibold text-gray-900">
                            {school.courses}
                          </span>
                          <span className="text-xs text-gray-600">courses</span>
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="p-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          {renderStars(school.rating)}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {school.rating}/5
                        </div>
                        <div className="text-xs text-gray-600">
                          {school.reviews} reviews
                        </div>
                      </div>
                    </td>

                    {/* Registration */}
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {school.registeredOn}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Programs */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {school.programs &&
                          school.programs.map((program, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium"
                            >
                              {program}
                            </span>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {schoolData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No schools data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
