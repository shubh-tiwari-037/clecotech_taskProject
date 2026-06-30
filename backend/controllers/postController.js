import Post from "../model/postModel.js";


export const createPost = async (req, res) => {
  try {
    const { title, description ,like,viwes } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description are required",
      });
    }

    const post = await Post.create({
      title,
      description,
      like,
      viwes,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All posts fetched",
      posts,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post found",
      post,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      post.user.toString() !== req.user._id.toString() 
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this post",
      });
    }

    post.title = title || post.title;
    post.description = description || post.description;

    const updatedPost = await post.save();

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      post.user.toString() !== req.user._id.toString() 
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    await post.deleteOne();

    return res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}