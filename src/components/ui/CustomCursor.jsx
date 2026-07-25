import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const trailRefs = useRef([]);
  const requestRef = useRef();

  // Mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configs for different elements
  const mainSpring = { damping: 28, stiffness: 500, mass: 0.5 };
  const ringSpring = { damping: 20, stiffness: 250, mass: 0.8 };
  const glowSpring = { damping: 15, stiffness: 150, mass: 1 };

  const cursorXSpring = useSpring(cursorX, mainSpring);
  const cursorYSpring = useSpring(cursorY, mainSpring);
  const ringXSpring = useSpring(cursorX, ringSpring);
  const ringYSpring = useSpring(cursorY, ringSpring);
  const glowXSpring = useSpring(cursorX, glowSpring);
  const glowYSpring = useSpring(cursorY, glowSpring);

  // Trail positions
  const [trails, setTrails] = useState(
    Array(6).fill({ x: -100, y: -100 })
  );

  // Update trail with smooth interpolation
  const updateTrail = useCallback(() => {
    setTrails((prevTrails) => {
      const newTrails = [...prevTrails];
      const mouseX = cursorX.get();
      const mouseY = cursorY.get();

      for (let i = 0; i < newTrails.length; i++) {
        const prev = i === 0 ? { x: mouseX, y: mouseY } : newTrails[i - 1];
        const current = newTrails[i];
        const speed = 0.35 - i * 0.04;

        newTrails[i] = {
          x: current.x + (prev.x - current.x) * speed,
          y: current.y + (prev.y - current.y) * speed,
        };
      }
      return newTrails;
    });
    requestRef.current = requestAnimationFrame(updateTrail);
  }, [cursorX, cursorY]);

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  // Handle mouse down
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // Handle mouse enter/leave
  const handleMouseEnter = useCallback(() => setIsHidden(false), []);
  const handleMouseLeave = useCallback(() => setIsHidden(true), []);

  // Check element type for cursor variant
  const handleElementCheck = useCallback((e) => {
    const target = e.target;
    const tagName = target.tagName.toLowerCase();
    const classList = target.classList;

    // Check for data attributes for custom cursor
    const cursorType = target.getAttribute("data-cursor");
    if (cursorType) {
      setCursorVariant(cursorType);
      setCursorText(target.getAttribute("data-cursor-text") || "");
      return;
    }

    // Check for interactive elements
    const isButton = tagName === "button" || classList.contains("btn");
    const isLink = tagName === "a";
    const isInput = tagName === "input" || tagName === "textarea";
    const isClickable = window.getComputedStyle(target).cursor === "pointer";

    if (isButton) {
      setCursorVariant("button");
      setIsPointer(true);
    } else if (isLink) {
      setCursorVariant("link");
      setIsPointer(true);
    } else if (isInput) {
      setCursorVariant("text");
      setIsPointer(false);
    } else if (isClickable) {
      setCursorVariant("pointer");
      setIsPointer(true);
    } else {
      setCursorVariant("default");
      setIsPointer(false);
    }
    setCursorText("");
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleElementCheck);

    // Start trail animation
    requestRef.current = requestAnimationFrame(updateTrail);

    // Hide default cursor
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleElementCheck);
      cancelAnimationFrame(requestRef.current);
      const styleEl = document.getElementById("custom-cursor-style");
      if (styleEl) document.head.removeChild(styleEl);
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    handleElementCheck,
    updateTrail,
  ]);

  // Don't render on touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  // Cursor size based on variant
  const getCursorSize = () => {
    switch (cursorVariant) {
      case "button":
        return { dot: 16, ring: 60 };
      case "link":
        return { dot: 12, ring: 50 };
      case "text":
        return { dot: 4, ring: 30 };
      case "pointer":
        return { dot: 14, ring: 55 };
      default:
        return { dot: 8, ring: 40 };
    }
  };

  const sizes = getCursorSize();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference"
      style={{ opacity: isHidden ? 0 : 1 }}
    >
      {/* Magnetic trail dots */}
      {trails.map((trail, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: trail.x,
            top: trail.y,
            width: 10 - index * 1.2,
            height: 10 - index * 1.2,
            background: `rgba(255, 255, 255, ${0.6 - index * 0.08})`,
            transform: "translate(-50%, -50%)",
            filter: `blur(${index * 0.3}px)`,
          }}
        />
      ))}

      {/* Outer glow ring - slowest */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: glowXSpring,
          y: glowYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: sizes.ring + 30,
          height: sizes.ring + 30,
          background:
            "radial-gradient(circle, rgba(63, 185, 80, 0.18), transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{
          scale: isClicking ? 1.5 : isPointer ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main ring */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? sizes.ring * 0.7 : sizes.ring,
          height: isClicking ? sizes.ring * 0.7 : sizes.ring,
          borderColor: isPointer ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)",
          rotate: isPointer ? 45 : 0,
          borderRadius: cursorVariant === "text" ? "4px" : "50%",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Inner ring - rotating dashed */}
      <AnimatePresence>
        {isPointer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute rounded-full border border-dashed border-white/40"
            style={{
              x: ringXSpring,
              y: ringYSpring,
              translateX: "-50%",
              translateY: "-50%",
              width: sizes.ring + 15,
              height: sizes.ring + 15,
            }}
          />
        )}
      </AnimatePresence>

      {/* Center dot */}
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? sizes.dot * 2.5 : sizes.dot,
          height: isClicking ? sizes.dot * 2.5 : sizes.dot,
          borderRadius: cursorVariant === "text" ? "2px" : "50%",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Click explosion particles */}
      <AnimatePresence>
        {isClicking && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: cursorX.get(),
                  y: cursorY.get(),
                }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: cursorX.get() + Math.cos((i * Math.PI * 2) / 8) * 50,
                  y: cursorY.get() + Math.sin((i * Math.PI * 2) / 8) * 50,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{ translateX: "-50%", translateY: "-50%" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Orbiting particles on hover */}
      <AnimatePresence>
        {isPointer && !isClicking && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute"
                style={{
                  x: ringXSpring,
                  y: ringYSpring,
                }}
              >
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-white"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                  style={{
                    transformOrigin: `${-20 - i * 8}px 0px`,
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Cursor text label */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute px-3 py-1 bg-white text-gray-900 text-xs font-bold rounded-full whitespace-nowrap"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: "-50%",
              translateY: "calc(-50% + 40px)",
            }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner accent lines on pointer */}
      <AnimatePresence>
        {isPointer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              x: ringXSpring,
              y: ringYSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute"
          >
            {/* Top-left */}
            <motion.div
              className="absolute w-3 h-3 border-t-2 border-l-2 border-white/60 rounded-tl-sm"
              style={{ top: -sizes.ring / 2 - 5, left: -sizes.ring / 2 - 5 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Top-right */}
            <motion.div
              className="absolute w-3 h-3 border-t-2 border-r-2 border-white/60 rounded-tr-sm"
              style={{ top: -sizes.ring / 2 - 5, right: -sizes.ring / 2 - 5 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            {/* Bottom-left */}
            <motion.div
              className="absolute w-3 h-3 border-b-2 border-l-2 border-white/60 rounded-bl-sm"
              style={{ bottom: -sizes.ring / 2 - 5, left: -sizes.ring / 2 - 5 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
            {/* Bottom-right */}
            <motion.div
              className="absolute w-3 h-3 border-b-2 border-r-2 border-white/60 rounded-br-sm"
              style={{ bottom: -sizes.ring / 2 - 5, right: -sizes.ring / 2 - 5 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crosshair lines */}
      <AnimatePresence>
        {cursorVariant === "button" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            style={{
              x: ringXSpring,
              y: ringYSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute"
          >
            <div className="absolute w-px h-8 bg-white -top-4 left-1/2 -translate-x-1/2" />
            <div className="absolute w-px h-8 bg-white -bottom-4 left-1/2 -translate-x-1/2" />
            <div className="absolute h-px w-8 bg-white -left-4 top-1/2 -translate-y-1/2" />
            <div className="absolute h-px w-8 bg-white -right-4 top-1/2 -translate-y-1/2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
