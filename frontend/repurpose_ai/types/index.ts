export interface TwitterThread {
  hook: string;
  tweets: string[];
}

export interface SocialAssets {
  twitter: TwitterThread;
  linkedin: string;
  newsletter: string;
}

export interface GenerateResponse {
  status: string;
  data: SocialAssets;
}