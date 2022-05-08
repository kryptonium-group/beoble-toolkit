export interface ProfilePostParams {
  alias?: string;
  display_name: string;
  description?: string;
  representative_mdeia?: string;
}

export interface ProfileResponse {
  id: string;
  create_time: string;
  update_time: string;
  alias: string;
  display_name: string;
  description: string;
  representative_media: string;
}

export interface ProfilePutParams
  extends Omit<ProfilePostParams, 'display_name'> {
  id: string;
  display_name?: string;
}
