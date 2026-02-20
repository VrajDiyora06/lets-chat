import { useState, useEffect, useRef } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import Picker from "emoji-picker-react";

export default function ChatForm(props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (event, emojiObject) => {
    // emoji-picker-react v3 passes (event, emojiObject)
    setMessage((prev) => prev + emojiObject.emoji);
    // Keep focus on input after selecting emoji
    inputRef.current?.focus();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return; // Don't send empty messages

    props.handleFormSubmit(message);
    setMessage("");
    setShowEmojiPicker(false); // Close emoji picker after sending
    inputRef.current?.focus(); // Keep focus on input
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        props.handleFormSubmit(message);
        setMessage("");
        setShowEmojiPicker(false);
      }
    }
  };

  return (
    <div className="relative">
      {/* Emoji Picker - positioned above the input */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-full left-0 z-50 mb-2"
        >
          <Picker
            onEmojiClick={handleEmojiClick}
            theme="dark"
            width={320}
            height={400}
            searchDisabled={false}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title={showEmojiPicker ? "Close emoji picker" : "Open emoji picker"}
          >
            <EmojiHappyIcon
              className={`h-7 w-7 transition-colors duration-200 ${showEmojiPicker
                ? "text-blue-400 dark:text-blue-400"
                : "text-blue-600 dark:text-blue-500"
                }`}
              aria-hidden="true"
            />
          </button>

          <input
            ref={inputRef}
            type="text"
            placeholder="Write a message"
            className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button
            type="submit"
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title="Send message"
          >
            <PaperAirplaneIcon
              className="h-6 w-6 text-blue-600 dark:text-blue-500 rotate-[90deg]"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
