import React, { ImgHTMLAttributes } from 'react'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>{
  srcFallback?: string
}

const Image: React.FC<ImageProps> = ({ src, srcFallback = '', ...props }) => (
  <img
    src={src}
    onError={
      (evt: any) => {
        evt.target.onerror = null
        evt.target.src = srcFallback || require('../../assets/default-placeholder.png')
      }
    }
    {...props}
  />
)

export default Image
