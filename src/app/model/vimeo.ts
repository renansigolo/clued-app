export interface VimeoGroupVideos {
  total: number
  page: number
  per_page: number
  paging: Paging
  data: Datum[]
}

export interface Datum {
  uri: string
  name: string
  description: null | string
  type: string
  link: string
  duration: number
  width: number
  language: null | string
  height: number
  embed: Embed
  created_time: string
  modified_time: string
  release_time: string
  content_rating: string[]
  license: null
  privacy: Privacy
  pictures: Pictures
  tags: Tag[]
  stats: Stats
  categories: any[]
  metadata: DatumMetadata
  user: User
  app: App
  status: string
  resource_key: string
  upload: null
  transcode: null
}

export interface App {
  name: string
  uri: string
}

export interface Embed {
  html: string
  badges: Badges
}

export interface Badges {
  hdr: boolean
  live: Live
  staff_pick: StaffPick
  vod: boolean
  weekend_challenge: boolean
}

export interface Live {
  streaming: boolean
  archived: boolean
}

export interface StaffPick {
  normal: boolean
  best_of_the_month: boolean
  best_of_the_year: boolean
  premiere: boolean
}

export interface DatumMetadata {
  connections: PurpleConnections
  interactions: Interactions
}

export interface PurpleConnections {
  comments: Comments
  credits: Comments
  likes: Comments
  pictures: Comments
  texttracks: Comments
  related: Recommendations | null
  recommendations: Recommendations
}

export interface Comments {
  uri: string
  options: PurpleOption[]
  total: number
}

export enum PurpleOption {
  Get = 'GET',
  Post = 'POST',
}

export interface Recommendations {
  uri: string
  options: RecommendationsOption[]
}

export enum RecommendationsOption {
  Get = 'GET',
  Patch = 'PATCH',
}

export interface Interactions {
  report: Report
}

export interface Report {
  uri: string
  options: PurpleOption[]
  reason: string[]
}

export interface Pictures {
  uri: string
  active: boolean
  type: string
  sizes: Size[]
  resource_key: string
}

export interface Size {
  width: number
  height: number
  link: string
  link_with_play_button?: string
}

export interface Privacy {
  view: string
  embed: string
  download: boolean
  add: boolean
  comments: string
}

export interface Stats {
  plays: null
}

export interface Tag {
  uri: string
  name: string
  tag: string
  canonical: string
  metadata: TagMetadata
  resource_key: string
}

export interface TagMetadata {
  connections: FluffyConnections
}

export interface FluffyConnections {
  videos: Comments
}

export interface User {
  uri: string
  name: string
  link: string
  location: string
  bio: null
  short_bio: null
  created_time: string
  pictures: Pictures
  websites: any[]
  metadata: UserMetadata
  resource_key: string
  account: string
}

export interface UserMetadata {
  connections: TentacledConnections
}

export interface TentacledConnections {
  albums: Comments
  appearances: Comments
  channels: Comments
  feed: Recommendations
  followers: Comments
  following: Comments
  groups: Comments
  likes: Comments
  membership: Recommendations
  moderated_channels: Comments
  portfolios: Comments
  videos: Comments
  shared: Comments
  pictures: Comments
}

export interface Paging {
  next: null
  previous: null
  first: string
  last: string
}
