// View Transition API utility functions
export const startViewTransition = (callback) => {
  // Check if View Transition API is supported
  if (!document.startViewTransition) {
    // Fallback for browsers that don't support View Transition API
    callback()
    return
  }

  // Start the view transition
  document.startViewTransition(() => {
    callback()
  })
}

// Predefined transition configurations
export const transitionConfig = {
  // Slide transitions for page navigation
  slideLeft: {
    name: "slide-left",
    duration: "0.3s",
    easing: "ease-out",
  },
  slideRight: {
    name: "slide-right",
    duration: "0.3s",
    easing: "ease-out",
  },
  // Fade transitions for modals and overlays
  fade: {
    name: "fade",
    duration: "0.25s",
    easing: "ease-in-out",
  },
  // Scale transitions for buttons and cards
  scale: {
    name: "scale",
    duration: "0.2s",
    easing: "ease-out",
  },
}

// Add transition classes to elements
export const addTransitionName = (element, transitionName) => {
  if (element) {
    element.style.viewTransitionName = transitionName
  }
}

// Remove transition classes from elements
export const removeTransitionName = (element) => {
  if (element) {
    element.style.viewTransitionName = ""
  }
}
