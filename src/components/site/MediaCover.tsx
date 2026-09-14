import { useSyncExternalStore } from 'react'

type MediaCoverProps = {
  imageUrl: string
  videoUrl?: string
  alt: string
  className?: string
  mediaClassName?: string
  /** CSS object-position, e.g. "center 20%" */
  objectPosition?: string
  /** object-position en viewports < 768px */
  objectPositionMobile?: string
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

function subscribeMobile(onChange: () => void) {
  const mq = window.matchMedia('(max-width: 767px)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getMobileSnapshot() {
  return window.matchMedia('(max-width: 767px)').matches
}

function getMobileServerSnapshot() {
  return false
}

/**
 * Imagen o video de fondo (muted/loop). Si hay video, la imagen actúa de poster.
 * Con prefers-reduced-motion solo se muestra la imagen.
 *
 * Importante: no forzar `relative` aquí — el padre puede pasar `absolute inset-0`
 * y en Tailwind gana la utilidad del stylesheet, no el orden de la className.
 */
export function MediaCover({
  imageUrl,
  videoUrl,
  alt,
  className = 'relative overflow-hidden',
  mediaClassName = 'h-full w-full object-cover',
  objectPosition,
  objectPositionMobile,
}: MediaCoverProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  )
  const resolvedPosition =
    (isMobile && objectPositionMobile ? objectPositionMobile : objectPosition) ||
    undefined
  const style = resolvedPosition
    ? { objectPosition: resolvedPosition }
    : undefined
  const showVideo = Boolean(videoUrl) && !reduceMotion

  return (
    <div className={['overflow-hidden', className].join(' ')}>
      {showVideo ? (
        <video
          className={mediaClassName}
          style={style}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={imageUrl}
          aria-label={alt}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          className={mediaClassName}
          style={style}
        />
      )}
    </div>
  )
}
