function getAccessPayload(user) {
  const payload = {
    id: user.id,
    isActivated: user.isActivated
  }

  return payload;
}

function getRefreshPayload(user) {
  const payload = {
    id: user.id,
    isActivated: user.isActivated
  }

  return payload;
}

export { getAccessPayload, getRefreshPayload };