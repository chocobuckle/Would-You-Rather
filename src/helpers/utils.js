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
