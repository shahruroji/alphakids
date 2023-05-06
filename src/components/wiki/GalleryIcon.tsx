import NextImage from 'next/image'
import { useCallback, useState } from 'react'
import { Flex, AspectRatio, Text } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { MotionSpan } from '~components/motion'

interface GalleryIconProps {
  src?: string
  title?: string
  bg?: string
}

const TRANSFORM_SX = { transform: 'scale(1.05)' }
const TRANSITION_SX = 'transform 0.2s cubic-bezier(.08,.52,.52,1)'

const blur: Variants = {
  loading: {
    filter: 'blur(8px)',
  },
  loaded: {
    filter: 'blur(0px)',
  },
}

export const GalleryIcon = ({ src, title, bg }: GalleryIconProps) => {
  const [loaded, setLoaded] = useState(false)

  const handleLoaded = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <Flex
      as="span"
      pos="relative"
      align="center"
      justify="center"
      p="10%"
      bg="white"
      data-group
      rounded="icon"
      {...(title && {
        _hover: TRANSFORM_SX,
        transition: TRANSITION_SX,
      })}
      _before={{
        content: '""',
        pos: 'absolute',
        boxSize: '93%',
        rounded: 'inherit',
        ...(bg && { bg }),
      }}
    >
      <AspectRatio
        as={MotionSpan}
        display="block"
        w="100%"
        _groupHover={
          title
            ? {
                opacity: 0,
                transform: 'scale(0.4)',
              }
            : TRANSFORM_SX
        }
        ratio={1}
        transitionDuration={title ? 'slower' : 'normal'}
        transitionProperty="transform,opacity"
        transitionTimingFunction="cubic-bezier(.08,.52,.52,1)"
        variants={blur}
        initial="loading"
        animate={loaded ? 'loaded' : 'loading'}
      >
        {src ? (
          <NextImage
            src={src}
            alt={`${title ?? ''} icon`}
            onLoadingComplete={handleLoaded}
            fill
            unoptimized
          />
        ) : (
          <span />
        )}
      </AspectRatio>
      {title && (
        <Text
          as="span"
          pos="absolute"
          w="85%"
          fontFamily="heading"
          fontSize="fmd"
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          noOfLines={1}
          transitionDuration="slower"
          transitionProperty="opacity"
          transitionTimingFunction="cubic-bezier(.08,.52,.52,1)"
        >
          {title}
        </Text>
      )}
    </Flex>
  )
}
