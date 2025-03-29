import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";



// Sample Data
const userProfile = {
    name: "John Doe",
    bio: "Tech enthusiast and avid networker.",
    profilePic: "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg",
    initialFollowers: 100, // Initial follower count
  };
  
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
    // State to handle the number of followers
    const [peopleToNetwork, setPeopleToNetwork] = useState(initialPeopleToNetwork);
    const [totalFollowers, setTotalFollowers] = useState(0); 

    useEffect(() => {
        // Update the total followers whenever peopleToNetwork state changes
        const count = peopleToNetwork.filter(person => person.isFollowed).length;
        setTotalFollowers(count);
      }, [peopleToNetwork]); 
  
    // State for active tab (Feed/People)
    const [activeTab, setActiveTab] = useState("feed");
  
    // State for filtering posts by school
    const [filter, setFilter] = useState("");
  
    // Toggle follow/unfollow
    const handleFollowToggle = (id) => {
        // Update the follow status of the specific person
        const updatedPeople = peopleToNetwork.map(person => 
          person.id === id ? { ...person, isFollowed: !person.isFollowed } : person
        );
        setPeopleToNetwork(updatedPeople);
      };
  
    // Filtered posts based on user input
    const filteredPosts = initialPosts.filter((post) =>
      post.school.toLowerCase().includes(filter.toLowerCase())
    );
    
    const navigate = useNavigate();
    // Open the chat window or handle chat functionality
    const handleChatClick = () => {
      navigate("/Privatechat");
    };
  
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
        </div>
  
        {/* Right Section: Content */}
        <div className="content">
          {activeTab === "feed" ? (
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
          ) : (
            <div className="people-to-network">
                <h2>People to Network With</h2>
                {peopleToNetwork.map((person) => (
                    <div key={person.id} className="person-card">
                    <h3>{person.name}</h3>
                    <p>{person.major}</p>
                    <button 
                        className={`follow-btn ${person.isFollowed ? 'followed' : ''}`} 
                        onClick={() => handleFollowToggle(person.id)}
                    >
                        {person.isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                    </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Profile Section */}
        <div className="profile">
          <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
          <h2>{userProfile.name}</h2>
          <p>{userProfile.bio}</p>
          <p className="followers-count">
            Followers: <span>{totalFollowers}</span>
          </p>
          
          {/* Chat Button */}
          <button
            className="chat-btn"
            onClick={handleChatClick}
          >
            Chat
          </button>
        </div>
      </div>
    );
  }