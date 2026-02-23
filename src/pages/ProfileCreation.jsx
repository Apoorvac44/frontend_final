import React, { useState } from 'react';
import { Camera, User, MapPin, Briefcase, Heart } from 'lucide-react';
import './ProfileCreation.css';

const ProfileCreation = ({ onLogin }) => {
    const fileInputRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        religion: '',
        location: '',
        profession: '',
        interests: '',
        photo: null
    });

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, photo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ ...formData, photoUrl: previewUrl });
    };

    return (
        <div className="profile-creation-page container">
            <div className="form-card card">
                <h1>Create Your Profile</h1>
                <p>Tell us more about yourself to find the right matches.</p>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="photo-upload">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <div className="photo-placeholder" onClick={handlePhotoClick}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="photo-preview" />
                            ) : (
                                <>
                                    <Camera size={40} color="var(--text-secondary)" />
                                    <span>Upload Photo</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label><User size={16} /> Full Name</label>
                            <input type="text" name="name" required placeholder="John Doe" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" name="age" required min="18" max="70" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" required onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Religion</label>
                            <input type="text" name="religion" required placeholder="e.g. Hindu, Muslim, Christian" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label><MapPin size={16} /> Location</label>
                            <input type="text" name="location" required placeholder="City, Country" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label><Briefcase size={16} /> Profession</label>
                            <input type="text" name="profession" required placeholder="e.g. Software Engineer" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label><Heart size={16} /> Interests & Hobbies</label>
                        <textarea
                            name="interests"
                            placeholder="Tell others what you enjoy doing in your free time..."
                            rows="4"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Complete Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileCreation;
