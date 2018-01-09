import { decisionsExpirationLength } from 'config/constants';

export function formatUserInfo(name, avatar, uid) {
  return {
    name,
    avatar,
    uid
  };
}

export function formatDecision(title, firstDecision, secondDecision, userInfo) {
  const { name, uid } = userInfo;
  const decision = {
    title,
    user: {
      name,
      uid
    },
    timestamp: Date.now(),
    userHasRepliedToThisDecision: false,
    firstDecision: {
      text: firstDecision,
      selectedCount: 0
    },
    secondDecision: {
      text: secondDecision,
      selectedCount: 0
    }
  };
  return decision;
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function getMilliseconds(timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime();
}

export function decisionsAreStale(timestamp) {
  return getMilliseconds(timestamp) > decisionsExpirationLength;
}
