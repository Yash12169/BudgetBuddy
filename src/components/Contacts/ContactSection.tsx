
import { montserrat } from "@/fonts/fonts";
import Link from "next/link";
import Navbar2 from "../Navbar/navbar2";

const teamMembers = [
  {
    name: "Yash Jewalkar",
    role: "Developer",
    bio: "Full-stack developer passionate about personal finance tools.",
    linkedin: "https://www.linkedin.com/in/yash-jewalkar-203b56257",
    github: "https://github.com/Yash12169",
  },
  {
    name: "Yash Maurya",
    role: "Junior developer",
    bio: "Creating intuitive user experiences for financial applications.",
    linkedin: "https://www.linkedin.com/in/yash-maurya-142136258",
    github: "https://github.com/yash-maurya23",
  },
];

export default function ContactSection() {
  return (
    <>
      <Navbar2 />
      <section
        id="contact"
        className="min-h-screen pt-36 px-4 md:px-16 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://t4.ftcdn.net/jpg/11/27/63/07/240_F_1127630724_oU6JuzUT5tdLEwD0MNznJt6oUs8c6fED.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-0" />
        <div className="relative z-10 max-w-5xl mx-auto p-6 rounded-xl shadow-lg">
          <h2
            className={`${montserrat} text-3xl font-bold mb-12 text-center text-gray-900`}
          >
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mr-4 text-xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-green-700">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-800 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="text-blue-700 hover:underline"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href={member.github}
                    target="_blank"
                    className="text-gray-700 hover:underline"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">
              Have Questions?
            </h3>
            <p className="text-center text-gray-800">
              Reach out to us at{" "}
              <a
                href="mailto:contact@budgetbuddy.com"
                className="text-green-600 hover:underline"
              >
                contact@budgetbuddy.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
