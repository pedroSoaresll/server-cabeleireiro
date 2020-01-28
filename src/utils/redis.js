export function mountQueueKey(establishmentId) {
  if (!establishmentId) {
    throw new Error('EstablishmentId not received in function');
  }

  return `${establishmentId}-queue`;
}

export function mountRoomKey(establishmentId) {
  if (!establishmentId) {
    throw new Error('EstablishmentId not received in function');
  }

  return `${establishmentId}-room`;
}
