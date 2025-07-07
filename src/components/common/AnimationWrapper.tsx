"use client"

import { motion, type Variants } from "framer-motion"
import type React from "react"

export type AnimationType =
  | "fade-in"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "scale-up"
  | "scale-down"
  | "rotate-in"
  | "flip-x"
  | "flip-y"
  | "bounce-in"
  | "zoom-in"
  | "zoom-out"
  | "elastic"
  | "spring"
  | "stagger-children"

export interface AnimationWrapperProps {
  children: React.ReactNode
  animation?: AnimationType
  duration?: number
  delay?: number
  distance?: number
  scale?: number
  rotation?: number
  staggerDelay?: number
  viewport?: boolean
  viewportMargin?: string
  once?: boolean
  className?: string
  hover?: boolean
  tap?: boolean
  whileInView?: boolean
  repeat?: number | boolean
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | [number, number, number, number]
  spring?: {
    type?: "spring"
    stiffness?: number
    damping?: number
    mass?: number
  }
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  animation = "fade-in",
  duration = 0.6,
  delay = 0,
  distance = 50,
  scale = 0.8,
  rotation = 180,
  staggerDelay = 0.1,
  viewport = true,
  viewportMargin = "-100px",
  once = true,
  className = "",
  hover = false,
  tap = false,
  whileInView = true,
  repeat = false,
  ease = "easeOut",
  spring,
}) => {
  // Animation variants
  const getAnimationVariants = (): Variants => {
    const baseTransition = {
      duration,
      delay,
      // Only assign ease if it's a valid value for Framer Motion
      ...(ease !== undefined
        ? {
            ease:
              typeof ease === "string"
                ? ease
                : Array.isArray(ease) && ease.length === 4
                ? ease as [number, number, number, number]
                : undefined,
          }
        : {}),
      repeat: repeat === true ? Number.POSITIVE_INFINITY : repeat || 0,
      ...(spring && { type: "spring" as const, ...spring }),
    }

    switch (animation) {
      case "fade-in":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        }

      case "fade-up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        }

      case "fade-down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        }

      case "fade-left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        }

      case "fade-right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        }

      case "slide-up":
        return {
          hidden: { y: distance },
          visible: { y: 0, transition: baseTransition },
        }

      case "slide-down":
        return {
          hidden: { y: -distance },
          visible: { y: 0, transition: baseTransition },
        }

      case "slide-left":
        return {
          hidden: { x: distance },
          visible: { x: 0, transition: baseTransition },
        }

      case "slide-right":
        return {
          hidden: { x: -distance },
          visible: { x: 0, transition: baseTransition },
        }

      case "scale-in":
        return {
          hidden: { opacity: 0, scale },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        }

      case "scale-up":
        return {
          hidden: { scale },
          visible: { scale: 1, transition: baseTransition },
        }

      case "scale-down":
        return {
          hidden: { scale: 1 / scale },
          visible: { scale: 1, transition: baseTransition },
        }

      case "rotate-in":
        return {
          hidden: { opacity: 0, rotate: rotation },
          visible: { opacity: 1, rotate: 0, transition: baseTransition },
        }

      case "flip-x":
        return {
          hidden: { opacity: 0, rotateX: rotation },
          visible: { opacity: 1, rotateX: 0, transition: baseTransition },
        }

      case "flip-y":
        return {
          hidden: { opacity: 0, rotateY: rotation },
          visible: { opacity: 1, rotateY: 0, transition: baseTransition },
        }

      case "bounce-in":
        return {
          hidden: { opacity: 0, scale: 0.3 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              ...baseTransition,
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          },
        }

      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        }

      case "zoom-out":
        return {
          hidden: { opacity: 0, scale: 2 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        }

      case "elastic":
        return {
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              ...baseTransition,
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
        }

      case "spring":
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              ...baseTransition,
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          },
        }

      case "stagger-children":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }

      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        }
    }
  }

  // Hover animations
  const getHoverAnimation = () => {
    if (!hover) return {}

    switch (animation) {
      case "scale-in":
      case "scale-up":
        return { scale: 1.05 }
      case "fade-up":
        return { y: -5 }
      case "fade-down":
        return { y: 5 }
      case "rotate-in":
        return { rotate: 5 }
      default:
        return { scale: 1.02, y: -2 }
    }
  }

  // Tap animations
  const getTapAnimation = () => {
    if (!tap) return {}
    return { scale: 0.95 }
  }

  const variants = getAnimationVariants()

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate={!whileInView ? "visible" : undefined}
      whileInView={whileInView ? "visible" : undefined}
      viewport={
        viewport
          ? {
              once,
              margin: viewportMargin,
            }
          : undefined
      }
      whileHover={hover ? getHoverAnimation() : undefined}
      whileTap={tap ? getTapAnimation() : undefined}
    >
      {children}
    </motion.div>
  )
}

export default AnimationWrapper
