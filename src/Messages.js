import React, { useEffect, useRef } from "react";
import useCollection from "./useCollection";
import useDocWithCache from "./useDocWIthCache";
import formatDate from "date-fns/format";
import { isSameDay } from "date-fns";

function useChatScrollManager(ref) {
  useEffect(() => {
    const node = ref.current;
    node.scrollTop = node.scrollHeight;
  });
}

function Messages({ channelId }) {
  const messages = useCollection(
    `channels/${channelId}/messages`,
    "createdApt"
  );

  const scrollerRef = useRef();
  useChatScrollManager(scrollerRef);

  return (
    <div ref={scrollerRef} className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const previous = message[index - 1];
        const showDay = shouldShowDay(previous, message);
        const showAvatar = shouldShowAvatar(previous, message);

        return showAvatar ? (
          <FirstMessageFromUser
            key={message.id}
            message={message}
            showDay={showDay}
          />
        ) : (
          <div>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FirstMessageFromUser({ message, showDay }) {
  const author = useDocWithCache(message.user.path);
  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {new Date(message.createdApt.seconds * 1000).toLocaleDateString()}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoUrl}")` : "",
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{" "}
            <span className="TimeStamp">
              {formatDate(message.createdApt.seconds * 1000, "h:mm a")}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

function shouldShowDay(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(
    previous.createdApt.seconds * 1000,
    message.createdApt.seconds * 1000
  );
  return isNewDay;
}

function shouldShowAvatar(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }
  const differentUser = message.user.id !== previous.user.id;
  if (differentUser) {
    return true;
  }
  const hasBeenAWhile =
    message.createdApt.seconds - previous.createdApt.seconds > 180;
  return hasBeenAWhile;
}

export default Messages;
