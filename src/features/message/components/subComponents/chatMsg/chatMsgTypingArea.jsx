import { Icons } from "../../../../../assets/icons";

export const ChatMsgTypingArea = ({ sendMessage, message, setMessage }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };
  return (
    <div className="send-msg-input w-full p-3 border-t border-(--border-color) bg-(--bg-primary)">
      <form onSubmit={sendMessage} className="flex items-center gap-3">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={message}
          rows={1}
          className="p-3 rounded-2xl flex-1 text-(--text-primary) bg-(--bg-tertiary) focus:ring-2 focus:ring-red-500 outline-none border border-(--border-color) resize-none"
          placeholder="Write Your Message..."
        />
        <button
          type="submit"
          className="p-2 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
        >
          <Icons.send className="text-red-500" size={28} />
        </button>
      </form>
    </div>
  );
};
