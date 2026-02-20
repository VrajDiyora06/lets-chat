import ChatRoom from "../models/ChatRoom.js";

export const createChatRoom = async (req, res) => {
  const { senderId, receiverId } = req.body;
  const sortedMembers = [senderId, receiverId].sort();

  try {
    // Check if a chat room already exists between these two users
    const existingRoom = await ChatRoom.findOne({
      members: { $all: sortedMembers },
    });

    if (existingRoom) {
      // Return the existing room instead of creating a duplicate
      return res.status(200).json(existingRoom);
    }

    // Create new room only if one doesn't exist
    const newChatRoom = new ChatRoom({
      members: sortedMembers,
    });
    await newChatRoom.save();
    res.status(201).json(newChatRoom);
  } catch (error) {
    console.error("Error in createChatRoom:", error.message);
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getChatRoomOfUser = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getChatRoomOfUsers = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.find({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
