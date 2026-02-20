import ChatMessage from "../models/ChatMessage.js";

export const createMessage = async (req, res) => {
  const newMessage = new ChatMessage({
    ...req.body,
    readBy: [req.body.sender], // Sender has already "read" their own message
  });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      chatRoomId: req.params.chatRoomId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const markMessagesAsRead = async (req, res) => {
  const { chatRoomId } = req.params;
  const { userId } = req.body;

  try {
    await ChatMessage.updateMany(
      { chatRoomId, readBy: { $nin: [userId] } },
      { $addToSet: { readBy: userId } }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUnreadCounts = async (req, res) => {
  const { userId } = req.params;

  try {
    const unreadCounts = await ChatMessage.aggregate([
      {
        $match: {
          sender: { $ne: userId },
          readBy: { $nin: [userId] },
        },
      },
      {
        $group: {
          _id: "$chatRoomId",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert to a map { chatRoomId: count }
    const countsMap = {};
    unreadCounts.forEach((item) => {
      countsMap[item._id] = item.count;
    });

    res.status(200).json(countsMap);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
