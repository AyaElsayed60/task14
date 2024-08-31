import React, { useState, useEffect } from 'react';
import './GitHubUser.css';
import iconCompany from '../../images/icon-company.svg';
import iconLocation from '../../images/icon-location.svg';
import iconSearch from '../../images/icon-search.svg';
import iconSun from '../../images/icon-sun.svg';
import iconTwitter from '../../images/icon-twitter.svg';
import iconWebsite from '../../images/icon-website.svg';
import defaultAvatar from '../../images/favicon-32x32.png';


function GitHubUser() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);

    const fetchUserData = () => {
        if (username) {
            fetch(`https://api.github.com/users/${username}`)
                .then(response => response.json())
                .then(data => setUserData(data));
        }
    };

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSearch = () => {
        fetchUserData();
    };

    useEffect(() => {
        // Optionally fetch data automatically when the component mounts
        // fetchUserData();
    }, []);

    return (
        <div className="container">
            <div className="top-bar">
                <h1>devfinder</h1>
                <div className="theme-toggle">
                    <span>Light</span>
                    <img src={iconSun} alt="Sun Icon" className="theme-icon" />
                </div>
            </div>

            <div className="search-bar">
                <div className="input-container">
                    <img src={iconSearch} alt="Search" className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search GitHub username..." 
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            
            {userData && (
                <div className="card">
                    <div className="card-header">
                    <img 
                            src={userData.avatar_url || defaultAvatar} 
                            alt={userData.login} 
                            className="avatar" 
                        />                        <div className="user-info">
                            <h2>{userData.name || 'The Octocat'}</h2>
                            <h3>@{userData.login}</h3>
                            <p>{userData.bio || 'This profile has no bio'}</p>
                            <p className="join-date">Joined {new Date(userData.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="card-stats">
                        <div>
                            <h4>Repos</h4>
                            <p>{userData.public_repos}</p>
                        </div>
                        <div>
                            <h4>Followers</h4>
                            <p>{userData.followers}</p>
                        </div>
                        <div>
                            <h4>Following</h4>
                            <p>{userData.following}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="column">
                            <div className="footer-item">
                                <img src={iconLocation} alt="Location" className="icon" />
                                <p>{userData.location || 'Location not available'}</p>
                            </div>
                            <div className="footer-item">
                                <img src={iconCompany} alt="Company" className="icon" />
                                <p>{userData.company || 'Company not available'}</p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="footer-item">
                                <img src={iconWebsite} alt="Website" className="icon" />
                                <a href={userData.blog || '#'} target="_blank" rel="noreferrer">
                                    {userData.blog || 'Website not available'}
                                </a>
                            </div>
                            <div className="footer-item">
                                <img src={iconTwitter} alt="Twitter" className="icon" />
                                <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noreferrer">
                                    {userData.twitter_username || 'Twitter not available'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default GitHubUser;