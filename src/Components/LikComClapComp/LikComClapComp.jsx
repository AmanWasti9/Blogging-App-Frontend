import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { MdBookmarkAdd } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
// import { useSpeechSynthesis } from "react-speech-kit";
import { CiBookmarkPlus } from "react-icons/ci";
// import b1 from "../../Images/boy1.jpg";
// import b2 from "../../Images/boy2.png";
// import g from "../../Images/girl.jpg";
import { FaHeart } from "react-icons/fa";
import {
  createLike,
  deleteLike,
  loadLikeByPost,
  loadLikeByUser,
} from "../../Services/LikeService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUserDetail, isLoggedIn } from "../../Auth/Auth";
import {
  createSave,
  deleteSave,
  loadSaveByUser,
} from "../../Services/SaveService";

export default function LikComClapComp() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // const { speak, speaking, cancel, voices } = useSpeechSynthesis();
  // const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLiked, setIsLiked] = useState(undefined);
  const [isSaved, setIsSaved] = useState(undefined);
  const [totalLikes, setTotalLikes] = useState();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const currentUser = getCurrentUserDetail();
        if (currentUser) {
          setUser(currentUser);
          const likes = await loadLikeByUser(currentUser.id);

          const userLikeForPost = likes.find((like) => {
            return like.post.postId === Number(postId); // Convert postId to a number
          });

          if (userLikeForPost) {
            setIsLiked(userLikeForPost.isLike);
          }
        }
      } catch (error) {
        console.error("Error loading likes:", error);
        setIsLiked(false); // Set isLiked to false in case of error
      }
    };

    const fetchSaves = async () => {
      try {
        const currentUser = getCurrentUserDetail();
        if (currentUser) {
          setUser(currentUser);
          const saves = await loadSaveByUser(currentUser.id);

          const userSaveForPost = saves.find((save) => {
            return save.post.postId === Number(postId); // Convert postId to a number
          });

          if (userSaveForPost) {
            setIsSaved(userSaveForPost.isSave);
          }
        }
      } catch (error) {
        console.error("Error loading Saves:", error);
        setIsSaved(false); // Set isLiked to false in case of error
      }
    };

    if (postId) {
      fetchLikes(); // Call fetchLikes on component mount
      fetchSaves(); // Call fetchSaves on component mount
    }
  }, [postId]); // Add postId to the dependency array to re-fetch likes when postId changes

  useEffect(() => {
    const fetchTotalLike = async () => {
      try {
        const loadAllLikesOfPost = await loadLikeByPost(postId);
        setTotalLikes(loadAllLikesOfPost.length);
      } catch (error) {
        console.error("Error loading likes:", error);
      }
    };

    fetchTotalLike();
  }, [postId]);

  // useEffect(() => {
  //   // Update isSpeaking state based on speech synthesis state
  //   setIsSpeaking(speaking);
  // }, [speaking]);

  // const handleClick = (voiceIndex) => {
  //   if (!isLoggedIn()) {
  //     navigate("/register-and-login");
  //     return;
  //   }

  //   if (speaking) {
  //     // If speech synthesis is ongoing
  //     if (isSpeaking) {
  //       cancel(); // Pause speech
  //     } else {
  //       speak({ text: content, rate: 0.4, voice: voices[voiceIndex] }); // Resume speech
  //     }
  //   } else {
  //     // If speech synthesis is not ongoing, start speaking
  //     speak({ text: content, rate: 0.4, voice: voices[voiceIndex] });
  //   }
  // };

  // Handle Like
  const handleLike = async () => {
    if (!isLoggedIn()) {
      navigate("/register-and-login");
      return;
    }

    try {
      if (!isLiked) {
        const likeData = {
          userId: user?.id,
          postId: postId,
          isLike: !isLiked, // Toggle like state
        };

        // For Like Api
        await createLike(likeData);

        setIsLiked(!isLiked); // Toggle like state
        setTotalLikes((prevTotalLikes) => prevTotalLikes + 1); // Increment totalLikes
      } else {
        // Get the likeId associated with the post by the current user
        const likes = await loadLikeByUser(user.id);
        const userLikeForPost = likes.find(
          (like) => like.post.postId === Number(postId)
        );
        const likeId = userLikeForPost?.id; // Assuming you have likeId property

        // For Unlike Api
        await deleteLike(likeId);

        setIsLiked(!isLiked); // Toggle like state
        setTotalLikes((prevTotalLikes) => prevTotalLikes - 1); // Decrement totalLikes
      }
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  // Handle Save
  const handleSave = async () => {
    if (!isLoggedIn()) {
      navigate("/register-and-login");
      return;
    }

    try {
      if (!isSaved) {
        const saveData = {
          userId: user?.id,
          postId: postId,
          isSave: !isSaved, // Toggle Save state
        };

        // For Save Api
        await createSave(saveData);
        setIsSaved(!isSaved); // Toggle Save state
      } else {
        // Get the saveId associated with the post by the current user
        const saves = await loadSaveByUser(user.id);
        const userSaveForPost = saves.find(
          (save) => save.post.postId === Number(postId)
        );
        const saveId = userSaveForPost?.id; // Assuming you have saveId property

        // For UnSave Api
        await deleteSave(saveId);
        setIsSaved(!isSaved); // Toggle Save state
      }
    } catch (error) {
      toast.error(error.message || "Error");
    }
  };

  return (
    <div>
      <hr />
      <div className="d-f jc-b fs-30">
        <div className="d-f g-1_2w">
          <div>
            {isLiked ? (
              <>
                <FaHeart onClick={handleLike} className="cur-p c-r" />
              </>
            ) : (
              <>
                <CiHeart onClick={handleLike} className="cur-p" />
              </>
            )}
            <sub className="fs-13">{totalLikes}</sub>
          </div>

          <div>
            <FaRegComment />
          </div>

          <div>
            {isSaved ? (
              <>
                <MdBookmarkAdd onClick={handleSave} className="cur-p c-b" />
              </>
            ) : (
              <>
                <CiBookmarkPlus onClick={handleSave} className="cur-p" />
              </>
            )}
          </div>
        </div>
        {/* <div className="mydiv2 flex-row g-1_2w">
          <div onClick={() => handleClick(0)}>
            <img
              src={b1}
              alt=""
              className="h-3vw w-3vw obj-cov br-50per cur-p"
            />
          </div>
          <div onClick={() => handleClick(2)}>
            <img
              src={g}
              alt=""
              className="h-3vw w-3vw obj-cov br-50per cur-p"
            />
          </div>
          <div onClick={() => handleClick(1)}>
            <img
              src={b2}
              alt=""
              className="h-3vw w-3vw obj-cov br-50per cur-p"
            />
          </div>
        </div> */}
      </div>
      <hr />
    </div>
  );
}
