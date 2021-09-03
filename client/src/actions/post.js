import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
} from "../actions/types";

//Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/APIs/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like post
export const addLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/APIs/posts/like/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        post_id,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like post
export const removeLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/APIs/posts/unlike/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        post_id,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/APIs/posts/${post_id}`);

    dispatch({
      type: DELETE_POST,
      payload: post_id,
    });

    dispatch(setAlert("Post Removed", "success "));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
