



import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL;
const FeedPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [likes, setLikes] = useState([]); // To store like status for each video


  useEffect(() => {
    fetchVideos();

   
  }, []);


  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/videos/videos`);
      const updatedVideos = data.map(video => ({
        ...video,
        videoUrl: video.videoUrl.replace(/^http:/, 'https:') // Replace http with https
      }));
      setVideos(updatedVideos);
      setComments(updatedVideos.map(() => []));
      setLikes(updatedVideos.map(() => 0)); // Initially setting all likes to 0
    } catch (err) {
      console.error(err);
    }
  };
  



  const handleLike = (index) => {
    const token = localStorage.getItem("authToken"); // Ensure the user is authenticated
    console.log("Token found:", token); 
    if (!token) {
      console.log('no token present')
      alert("You must be logged in to like.");
      return;
    }
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[index] = newLikes[index] === 1 ? 0 : 1; // Toggle between 0 and 1
      return newLikes;
    });
  };
  
  const handleCommentClick = () => setIsCommentDialogOpen(true);


  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("authToken"); // Ensure the user is authenticated
    console.log("Token found:", token); 
    if (!token) {
      console.log('no token present')
      alert("You must be logged in to submit a comment.");
      return;
    }
  
    try {
      const videoId = videos[currentIndex]?._id;
      const response = await axios.post(
        `${apiUrl}/videos/comment/${videoId}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } } // Pass the token for backend validation
      );
  
      const newComment = { text: commentText };
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[currentIndex].push(newComment);
        return updatedComments;
      });
      setCommentText("");
      setIsCommentDialogOpen(false);
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };
  

 

  const handleShare = () => {
    const videoUrl = videos[currentIndex]?.videoUrl;
    if (videoUrl) {
      const whatsappUrl = `https://wa.me/?text=Check out this video: ${videoUrl}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentIndex(index);
              // Set video quality to 360p when it comes into view
              videoRefs.current[index].playbackRate = 1; // Default playbackRate
              videoRefs.current[index].setAttribute("playsinline", "true"); // Important for mobile
              videoRefs.current[index].setAttribute("muted", "muted");
              videoRefs.current[index].setAttribute("poster", ""); // Optional poster image to hide loading screen
              console.log("Video at index", index, "set to 360p");
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is in view
    );

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    backgroundColor: "#121212",
    mt: 4,
  }}
>
  <Box
    ref={containerRef}
    sx={{
      width: 350,
      height: 550,
      backgroundColor: "#232323",
      borderRadius: 20,
      boxShadow: "0 0 30px rgba(100, 100, 255, 0.9), 0 0 60px rgba(100, 100, 255, 0.6)",
      overflow: "auto",
      transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0 0 60px rgba(100, 100, 255, 1), 0 0 80px rgba(100, 100, 255, 0.8)",
        transform: "scale(1.05)",
      },
    }}
  >
    {videos.map((video, index) => (
      <CardMedia
        key={video._id}
        component="video"
        src={video.videoUrl}
        controls
        ref={(el) => (videoRefs.current[index] = el)}
        autoPlay={index === currentIndex}
        loop
        muted
        controlsList="nodownload noplaybackrate"
        sx={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    ))}
  </Box>

  <Box
    sx={{
      position: "absolute",
      top: "70%",
      right: "34%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: 4,
    }}
  >
    <IconButton
      sx={{ color: "#64b5f6", transition: "color 0.3s ease-in-out" }}
      onClick={() => handleLike(currentIndex)}
      onMouseOver={(e) => (e.currentTarget.style.color = "#1976d2")}
      onMouseOut={(e) => (e.currentTarget.style.color = "#64b5f6")}
    >
      <FavoriteIcon />
    </IconButton>
    <Typography sx={{ color: "#fff", fontSize: "0.8rem", textAlign: "center" }}>
      {likes[currentIndex] || 0}
    </Typography>
    <IconButton
      sx={{ color: "#64b5f6", transition: "color 0.3s ease-in-out" }}
      onClick={handleCommentClick}
      onMouseOver={(e) => (e.currentTarget.style.color = "#1976d2")}
      onMouseOut={(e) => (e.currentTarget.style.color = "#64b5f6")}
    >
      <CommentIcon />
    </IconButton>
    <IconButton
      sx={{ color: "#fff", transition: "color 0.3s ease-in-out" }}
      onClick={handleShare}
      onMouseOver={(e) => (e.currentTarget.style.color = "#1976d2")}
      onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
    >
      <ShareIcon />
    </IconButton>
  </Box>

  <Button
    variant="contained"
    sx={{
      position: "absolute",
      bottom: 30,
      right: 30,
      backgroundColor: "#64b5f6",
      color: "#fff",
      width: 60,
      height: 60,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 0 15px rgba(100, 100, 255, 0.8), 0 0 20px rgba(100, 100, 255, 0.5)",
      "&:hover": {
        backgroundColor: "#42a5f5",
        boxShadow: "0 0 30px rgba(100, 100, 255, 1), 0 0 40px rgba(100, 100, 255, 0.8)",
      },
    }}
    onClick={() => navigate("/upload")}
  >
    <AddIcon />
  </Button>

  <Dialog
    open={isCommentDialogOpen}
    onClose={() => setIsCommentDialogOpen(false)}
  >
    <DialogTitle sx={{ backgroundColor: "#333", color: "#fff" }}>Add a Comment</DialogTitle>
    <DialogContent sx={{ backgroundColor: "#232323", color: "#fff" }}>
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        sx={{ input: { color: "#fff" }, label: { color: "#aaa" } }}
      />
    </DialogContent>
    <DialogActions sx={{ backgroundColor: "#333" }}>
      <Button onClick={() => setIsCommentDialogOpen(false)} sx={{ color: "#64b5f6" }}>Cancel</Button>
      <Button onClick={handleCommentSubmit} color="primary">Post</Button>
    </DialogActions>
  </Dialog>

  <Box sx={{ padding: "10px", color: "#fff", maxHeight: "200px", overflowY: "auto" }}>
    {comments[currentIndex]?.map((comment, index) => (
      <Typography key={index} sx={{ marginBottom: "8px" }}>
        {comment.text}
      </Typography>
    ))}
  </Box>
</Box>

  );
};

export default FeedPage;
