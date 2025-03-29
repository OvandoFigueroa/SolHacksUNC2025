import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const userProfile = {
    name: "John Doe",
    bio: "Tech enthusiast and avid networker.",
    profilePic: "https://via.placeholder.com/300",
};

const initialPosts = [
    { id: 1, content: "0 code hackathon", school: "Kenan Flagler" },
    { id: 2, content: "UNC GO TARHEELS CODING MARATHON!", school: "UNC" },
    { id: 3, content: "Best hackathons in the country.", school: "NC State" },
];

export default function HomePage() {
    const [filter, setFilter] = useState("");
    const filteredPosts = initialPosts.filter((post) =>
        post.school.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="homepage">

            {/* Posts Section */}
            <div className="posts">
                <div className="filter">
                    <input
                        type="text"
                        placeholder="Filter by school..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-input"
                    />
                    <button onClick={() => setFilter("")} className="clear-btn">
                        Clear
                    </button>
                </div>

                {filteredPosts.map((post) => (
                    <div key={post.id} className="post-card">
                        <p>{post.content}</p>
                        <span className="school">#{post.school}</span>
                    </div>
                ))}
            </div>

            {/* Profile Section */}
            <div className="profile">
                <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
                <h2>{userProfile.name}</h2>
                <p>{userProfile.bio}</p>
            </div>
        </div>
    );
}
