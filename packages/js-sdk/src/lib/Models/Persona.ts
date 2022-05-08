export interface PersonaPostParams {
  profile: string;
  wallets: string[];
  chat_rooms?: string[];
  friends?: string[];
  groups?: string[];
  followers?: string[];
  followings?: string[];
  following_hashtags?: string[];
  reporters?: string[];
  reportings?: string[];
}

export interface PersonaResponse {
  id: string;
  create_time: string;
  update_time: string;
  profile: string;
  wallets: string[];
  chat_rooms: string[];
  friends: string[];
  followers: string[];
  followings: string[];
  following_hashtags: string[];
  groups: string[];
  reporters: string[];
  reportings: string[];
}

export type UpdateType = 'NORMAL' | 'ARRAY_ADD' | 'ARRAY_REMOVE';

export interface PersonaPutParams
  extends Omit<PersonaPostParams, 'profile' | 'wallets'> {
  id: string;
  update_type: UpdateType;
  profile?: string;
  wallets?: string[];
}

export interface PersonaGetParams {
  persona_id: string;
}
