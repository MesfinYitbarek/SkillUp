import express from 'express'
import Discussion from '../models/Discussion.js';
export const getDiscussion = async (req, res) => {
    const lessonId = req.params.lessonId;
  
    try {
      const discussion = await Discussion.find({ lessonId }).populate('comments.userId comments.replies.userId');
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
      res.json(discussion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const createComment = async (req, res) => {
    const lessonId = req.params.lessonId;
    const { userId, content } = req.body;
  
    if (!userId || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const discussion = await Discussion.findOneAndUpdate(
        { lessonId },
        { $push: { comments: { userId, content } } },
        { new: true, upsert: true } // Can be replaced with findOneAndCreate
      ).populate('comments.userId');
  
      if (!discussion) { // Check if discussion was created
        const newDiscussion = new Discussion({ lessonId, comments: [{ userId, content }] });
        await newDiscussion.save();
        return res.json(newDiscussion);
      }
  
      res.json(discussion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const  replay =  async (req, res) => {
    const commentId = req.params.commentId;
    const { userId, content } = req.body;
  
    if (!userId || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const discussion = await Discussion.findOneAndUpdate(
        { 'comments._id': commentId },
        { $push: { 'comments.$.replies': { userId, content } } },
        { new: true }
      ).populate('comments.replies.userId');
  
      if (!discussion) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.json(discussion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }