/** 照片 */
export interface Photo {
  src: string
  width?: number
  height?: number
  caption?: string
  isScreenshot?: boolean
}

/** 地点 */
export interface Location {
  id: number
  name: string
  category: string
  stars: number
  photos: Photo[]
  /** 合并后的全部评论文字 */
  reviewText: string
  /** 评论者昵称 */
  reviewerName: string
  /** 评论者头像路径（相对于 public/） */
  reviewerAvatar: string
  address: string
  mapKeyword: string
  coordinates?: [number, number]
}
