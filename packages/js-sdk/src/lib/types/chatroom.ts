export type MembershipAction = 'ADD' | 'REMOVE';
export type MembershipType = 'NORMAL' | 'ADMIN';
export type ChatRoomType = 'DIRECT_CHAT' | 'GROUP_CHAT' | 'CHANNEL';

export type Capablity =
  | 'ban-channel-members'
  | 'connect-events'
  | 'delete-any-message'
  | 'delete-channel'
  | 'delete-own-message'
  | 'flag-message'
  | 'freeze-channel'
  | 'join-channel'
  | 'leave-channel'
  | 'mute-channel'
  | 'pin-message'
  | 'quote-message'
  | 'read-events'
  | 'search-messages'
  | 'send-custom-events'
  | 'send-links'
  | 'send-message'
  | 'send-reaction'
  | 'send-reply'
  | 'send-typing-events'
  | 'set-channel-cooldown'
  | 'typing-events'
  | 'update-any-message'
  | 'update-channel'
  | 'update-channel-members'
  | 'update-own-message'
  | 'upload-file';

export type MemberRole = 'owner' | 'member';
export type ChannelRole = 'channel_member';

export type MessageType =
  | 'regular'
  | 'ephemeral'
  | 'error'
  | 'reply'
  | 'system'
  | 'deleted';

export type AttachmentType = 'image' | 'audio' | 'video';
