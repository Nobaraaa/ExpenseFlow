import "../App.css";
import api from "../services/api";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";

function Profile({ setShowProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",

  });
  const [originalProfile, setOriginalProfile] = useState(profile);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fullNameRef = useRef(null);

  useEffect(() => {
    console.log("User ID", userId);
    api.get(`/users/${userId}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (isEditing) {
      fullNameRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (profile.fullName.trim() === "") {
      toast.error("Full Name is required");
      return;
    }
    if (profile.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (!profile.email.includes("@")) {
      toast.error("Invalid Email Address");
      return;
    }
    if (profile.phone.length !== 10) {
      toast.error("Phone Number must be 10 digits");
      return;
    }
    setSaving(true);
    api.put(`/users/${userId}`, profile)
      .then((response) => {
        setProfile(response.data);
        setIsEditing(false);
        setSaving(false);
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {

        console.log(error);
        toast.error(error.response?.data?.message || "Failed to update profile.");
        setSaving(false);

      });
  };
  if (loading) {
    return <div className="loading"><div className="spinner-wrapper"><div className="spinner"></div></div><h3>Please Wait...</h3></div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-arrow" onClick={() => setShowProfile(false)}> ← </button>
        <h2> {isEditing ? "Edit Profile " : "My Profile"}
        </h2>
      </div>
      <div className="profile-card">
        <div className="profile-avatar">👤</div>
        <div className="profile-details">
          {isEditing ? (
            <>
              <label>Full Name  </label>
              <input
                ref={fullNameRef}
                className="profile-input"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />

              <label>Email </label>
              <input
                className="profile-input"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />

              <label>Phone Number </label>
              <input
                className="profile-input"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="profile-row">
                <label>Full Name</label>
                <span>{  profile.fullName}</span>
              </div>
              <div className="profile-row">
                <label>Email </label>
                <span>{ profile.email}</span>
              </div>
              <div className="profile-row">
                <label>Phone Number </label>
                <span>{  profile.phone}</span>
              </div>
            </>
          )}

        </div>



        {isEditing ? (
          <>
            <button className="edit-profile-btn" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button className="cancel-btn" onClick={() => { setProfile(originalProfile); setIsEditing(false); }}>Cancel</button>
          </>
        ) : (
          <button className="edit-profile-btn" onClick={() => { setOriginalProfile(profile); setIsEditing(true); }}>Edit Profile</button>
        )}

      </div>
    </div>


  );
}
export default Profile;