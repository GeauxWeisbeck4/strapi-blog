export const createAnimation = (loaderName: string, frames: string, suffix: string): string => {
    const animationName = `react-spinners-${loaderName}-${suffix}`;

    if (typeof window === "undefined" || !window.document) {
        return animationName;
    }

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    const styleSheet = styleElement.sheet;

    const keyFrames = `
      @keyframes ${animationName} {
        ${frames}
      }
    `;

    if (styleSheet) {
        styleSheet.insertRule(keyFrames, 0);
    }

    return animationName;
}
