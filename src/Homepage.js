import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const latinoClubs = [
  { 
    id: 1, 
    name: "Hispanic Latino Law Student Association", 
    description: "They aim to enhance the legal careers of its members, increase Hispanic-Latino representation, and serve the the Hispanic Latino community of the Research Triangle Area. ",
    link: "https://www.instagram.com/unc_hllsa/?igshid=bHJ6b3FuNnM3eTly&utm_source=qr" 
  },
  { 
    id: 2, 
    name: "Latino Medical Student Association", 
    description: "Construct a community between undergraduate students, medical students and physicians interested in Latino health and further the recruitment and retention of underrepresented students in medicine",
    link: "https://www.instagram.com/unc_lmsa/" 
  },
  { 
    id: 3, 
    name: "The Association of Latino Professionals For America", 
    description: "They aim to provide students of all nationalities a greater connection to Latinx professionals by offering a large pool of networking opportunities and extensive partnerships with big companies recruiting Tar Heel talent.",
    link: "https://www.instagram.com/alpfaunc_ch/" 
  },
  { 
    id: 4, 
    name: "Latinos in Tech", 
    description: "Latinos in Tech is a SHPE Chapter at UNC-Chapel Hill that intends to serve as a support system for Hispanic/Latino students interested in technology-related fields including computer science, data science, and information science.",
    link: "https://www.instagram.com/unc.latinosintech/" 
  },
  { 
    id: 5, 
    name: "Campus Y: Sanaa & Soul", 
    description: "UNC Student members of Sanaa & Soul help with an after-school program that brings diverse art to Durham students. They introduce them to Black, Latiné, and Indigenous artists to help them explore culture, creativity, and their own identities.",
    link: "hhttps://www.instagram.com/sanaa.soul/" 
  },
  { 
    id: 6, 
    name: "Mi Pueblo", 
    description: "Mi Pueblo seeks to sponsor awareness around Latinx issues, culture, and heritage at UNC and the surrounding community, as well as provide a supportive and welcoming environment for all students.",
    link: "https://www.instagram.com/mipueblounc/" 
  },
];

const initialPosts = [
  { id: 1, content: "0 code hackathon", school: "Kenan Flagler" },
  { id: 2, content: "UNC GO TARHEELS CODING MARATHON!", school: "UNC" },
  { id: 3, content: "Best hackathons in the country.", school: "NC State" },
  { id: 4, content: "Tech innovation is the future!", school: "MIT" },
  { id: 5, content: "Join us for a weekend coding competition.", school: "Stanford" },
];

const initialPeopleToNetwork = [
  { id: 1, name: "Alice Johnson", major: "Software Engineering", isFollowed: false },
  { id: 2, name: "Bob Brown", major: "Data Science", isFollowed: false },
  { id: 3, name: "Charlie White", major: "UX Design", isFollowed: false },
];

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [peopleToNetwork, setPeopleToNetwork] = useState(initialPeopleToNetwork);
  const [activeTab, setActiveTab] = useState("feed");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage when component mounts
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(userData);
    
    // Optional: Listen for storage events to update if localStorage changes in another tab
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        setCurrentUser(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const userProfile = {
    name: currentUser?.username || "John Doe",
    bio: `${currentUser?.grade || "Student"} at ${currentUser?.college || "Unknown College"} studying ${currentUser?.major || "Unknown Major"}`,
    profilePic: "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg",
  };

  const handleFollowToggle = (id) => {
    const updatedPeople = peopleToNetwork.map((person) =>
      person.id === id ? { ...person, isFollowed: !person.isFollowed } : person
    );
    setPeopleToNetwork(updatedPeople);
  };

  const handleChatClick = () => {
    navigate("/Chatbot");
  };

  const filteredPosts = initialPosts.filter((post) =>
    post.school.toLowerCase().includes(filter.toLowerCase())
  );

  const totalFollowers = peopleToNetwork.filter((person) => person.isFollowed).length;

  return (
    <div className="homepage">
      {/* Left Section: Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "feed" ? "active" : ""}`}
          onClick={() => setActiveTab("feed")}
        >
          Feed & Posts
        </button>
        <button
          className={`tab ${activeTab === "network" ? "active" : ""}`}
          onClick={() => setActiveTab("network")}
        >
          People to Network With
        </button>
        <button
          className={`tab ${activeTab === "latino-clubs" ? "active" : ""}`}
          onClick={() => setActiveTab("latino-clubs")}
        >
          Latino Clubs
        </button>
      </div>

      {/* Right Section: Content */}
      <div className="content">
        {activeTab === "feed" && (
          <div className="feed">
            {/* Filter for posts */}
            <div className="filter">
              <input
                type="text"
                placeholder="Filter by topic..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-input"
              />
              <button onClick={() => setFilter("")} className="clear-btn">
                Clear
              </button>
            </div>

            {/* Display filtered posts */}
            <div className="posts-container">
              {filteredPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <p>{post.content}</p>
                  <span className="school">#{post.school}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "network" && (
          <div className="people-to-network">
            <h2>People to Network With</h2>
            {peopleToNetwork.map((person) => (
              <div key={person.id} className="person-card">
                <h3>{person.name}</h3>
                <p>{person.major}</p>
                <button
                  className={person.isFollowed ? "unfollow-btn" : "follow-btn"}
                  onClick={() => handleFollowToggle(person.id)}
                >
                  {person.isFollowed ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        )}

{activeTab === "mynetwork" && (
          <div className="people-to-network">
            <h2>My Network</h2>
            {peopleToNetwork
              .filter((person) => person.isFollowed)
              .map((person) => (
                <div key={person.id} className="person-card">
                  <h3>{person.name}</h3>
                  <p>{person.major}</p>
                  <button
                    className={person.isFollowed ? "unfollow-btn" : "follow-btn"}
                    onClick={() => handleFollowToggle(person.id)}
                  >
                    {person.isFollowed ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
          </div>
        )}
{activeTab === "latino-clubs" && (
          <div className="latino-clubs">
            <h2>UNC Latino Clubs & Organizations</h2>
            <div className="clubs-container">
              {latinoClubs.map((club) => (
                <div key={club.id} className="club-card">
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                  <a 
                    href={club.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="club-link"
                  >
                    Visit Instagram
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="profile">
        <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
        <h2>{userProfile.name}</h2>
        <p>{userProfile.bio}</p>
        <p className="followers-count">
          Following: <span>{totalFollowers}</span>
        </p>

        {/* Chat Button */}
        <button className="chat-btn" onClick={handleChatClick}>
          Chat
        </button>
      </div>
    </div>
  );
}
