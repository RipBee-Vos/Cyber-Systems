import { useEffect, useState } from "react";
import { CheckCircle, Rocket, Wrench, Lightbulb, Github } from "lucide-react";

export default function DisruptionDashboard() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/ripbee-vos/cyber-systems/commits")
      .then((res) => res.json())
      .then((data) => setCommits(data.slice(0, 5)))
      .catch((err) => console.error("Error fetching commits:", err));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-6xl w-full">
        <div className="border rounded-xl p-4 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Core Mission</h2>
          <p className="text-base">
            To engineer intelligent systems and processes that empower security,
            transparency, and operational excellence—by creating what others won’t and
            questioning what others accept.
          </p>
        </div>

        <div className="border rounded-xl p-4 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Current Focus</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Paddington Project:</strong> Transparent proxy + IDS + VPN/DNS filtering</li>
            <li><strong>Automation Toolkit:</strong> Shift Planning Tool, alerting scripts</li>
            <li>
              <strong>LinkedIn Content:</strong> 
              <a href="https://www.linkedin.com/in/james-grant-iv" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">DIY cybersecurity posts</a>
            </li>
          </ul>
        </div>

        <div className="border rounded-xl p-4 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Personal Manifesto</h2>
          <blockquote className="italic border-l-4 pl-4 border-gray-400 text-base">
            “I build because I see what others overlook. I solve not for comfort, but for clarity.
            I am not here to play within systems—I’m here to challenge them, reforge them,
            and build better ones from the ground up. I don’t wait for change. I initiate it.”
          </blockquote>
        </div>

        <div className="border rounded-xl p-4 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Next 30 Days</h2>
          <ul className="space-y-2">
            <li><CheckCircle className="inline w-4 h-4 mr-2 text-green-500" />Finish VPN + DNS filtering pipeline</li>
            <li><Rocket className="inline w-4 h-4 mr-2 text-blue-500" />Post Paddington setup on <a href="https://www.linkedin.com/in/james-grant-iv" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">LinkedIn</a></li>
            <li><Wrench className="inline w-4 h-4 mr-2 text-yellow-500" />Build <a href="https://github.com/ripbee-vos/cyber-systems" target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline">"James’s Cyber Systems" portfolio</a></li>
            <li><Lightbulb className="inline w-4 h-4 mr-2 text-purple-500" />Draft: “Why I Don’t Fit—and Why That’s the Point”</li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-2 border rounded-xl p-4 shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Progress Tracker</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-1">Paddington Build</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <p className="mb-1">Automation Toolkit</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <p className="mb-1">Public Posting / Content</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 border rounded-xl p-4 shadow bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tools & Links</h2>
            <a href="https://github.com/ripbee-vos" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-800 hover:text-black">
              <Github className="w-5 h-5" />
              <span>GitHub Profile</span>
            </a>
          </div>
          <iframe
            title="Live GitHub Repo"
            src="https://ghbtns.com/github-btn.html?user=ripbee-vos&repo=cyber-systems&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="160"
            height="30"
          ></iframe>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Recent Commits</h3>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              {commits.map((commit, idx) => (
                <li key={idx}>
                  <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {commit.commit.message.split("\n")[0]}
                  </a> by {commit.commit.author.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
