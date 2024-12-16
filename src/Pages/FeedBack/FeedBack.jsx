import { useState } from "react";
import camera from "../../assets/camera.svg";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import useLanguage from "../../context/useLanguage";
import "./FeedBack.css";
import { toast } from "react-toastify";

function FeedBack() {
    const { language } = useLanguage();

    // State for form inputs
    const [formData, setFormData] = useState({
        image: null,
        name: "",
        location: "",
        comment: "",
    });
    const [charCount, setCharCount] = useState(0);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "comment") {
            setCharCount(value.length);
        }
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name === "" || formData.location === "" || formData.comment === "") {
            toast.error("Please fill all fields");
            return;
        }

        toast.success("Feedback submitted successfully");

        console.log("Submitted Feedback:", formData);
        // Reset form
        setFormData({
            image: null,
            name: "",
            location: "",
            comment: "",
        });
        setCharCount(0);
    };

    return (
        <>
            <div className="bg-orange">
                <Header />
            </div>
            <div className="feedback-container my-5">
                <h1>We Value Your Opinion!</h1>
                <p>Your feedback helps us improve and provide the best experience possible.</p>
                <form className="feedback-form" onSubmit={handleSubmit}>
                    {/* User Image Upload */}
                    <label htmlFor="user-image">Upload Your Picture (Optional):
                        <div
                            className="text-white p-4 rounded-circle d-flex m-auto"
                            style={{
                                backgroundColor: "#f2f3f4",
                                width: "fit-content",
                                cursor: "pointer",
                            }}
                        >
                            {formData.image ? (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="rounded-circle"
                                    style={{ width: "75px", height: "75px", objectFit: "cover" }}
                                />
                            ) : (
                                <img src={camera} alt="camera" />
                            )}
                        </div>
                    </label>

                    <input
                        type="file"
                        id="user-image"
                        className="d-none"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                    />

                    {/* User Details */}
                    <label htmlFor="name">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="location">Your Location:</label>
                    <input
                        type="text"
                        id="location"
                        placeholder="Enter your city or country"
                        value={formData.location}
                        onChange={handleInputChange}
                    />

                    {/* Feedback Text */}
                    <label htmlFor="comment">Your Feedback:</label>
                    <textarea
                        id="comment"
                        placeholder="Write about your experience with us..."
                        maxLength={250}
                        value={formData.comment}
                        onChange={handleInputChange}
                    />
                    <p id="char-counter">{charCount}/250 characters</p>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Submit Your Feedback
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default FeedBack;
