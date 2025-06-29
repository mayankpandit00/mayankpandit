export default function initSkills() {
  const skillDivs = document.querySelectorAll(".skill-category");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          reassembleAll(skillDivs);
        } else {
          explodeAll(skillDivs);
        }
      });
    },
    { threshold: 0.4 }
  );

  const section = document.querySelector("#skills");
  if (section) observer.observe(section);
}

function explodeAll(divs) {
  divs.forEach(div => {
    if (div.dataset.exploded === "true") return;
    div.dataset.exploded = "true";

    const { offsetWidth, offsetHeight } = div;
    const poof = document.createElement("div");
    poof.style.position = "absolute";
    poof.style.left = div.offsetLeft + "px";
    poof.style.top = div.offsetTop + "px";
    poof.style.width = offsetWidth + "px";
    poof.style.height = offsetHeight + "px";
    poof.style.pointerEvents = "none";
    poof.style.overflow = "visible";
    poof.style.zIndex = "1000";

    div.parentElement.append(poof);

    const rows = 4, cols = 4;
    const partWidth = offsetWidth / cols;
    const partHeight = offsetHeight / rows;
    const parts = [];

    const center = { x: (cols - 1) / 2, y: (rows - 1) / 2 };

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const part = document.createElement("span");
        part.style.position = "absolute";
        part.style.width = partWidth + "px";
        part.style.height = partHeight + "px";
        part.style.background = window.getComputedStyle(div).backgroundColor;
        part.style.left = x * partWidth + "px";
        part.style.top = y * partHeight + "px";
        part.style.transformOrigin = "center";
        parts.push({ element: part, x, y });
        poof.appendChild(part);
      }
    }

    div.style.visibility = "hidden";

    const animations = parts.map(({ element, x, y }) => {
      const normX = x - center.x;
      const normY = y - center.y;
      return element.animate([
        {
          transform: `translate(${normX * 100}px, ${normY * 100}px) scale(0.001)`,
          opacity: 0
        }
      ], {
        duration: 1000,
        easing: "ease-in-out",
        fill: "forwards"
      });
    });

    Promise.all(animations.map(a => a.finished)).then(() => {
      poof.remove();
    });
  });
}

function reassembleAll(divs) {
  divs.forEach(div => {
    if (div.dataset.exploded !== "true") return;
    div.dataset.exploded = "false";

    const { offsetWidth, offsetHeight } = div;
    const poof = document.createElement("div");
    poof.style.position = "absolute";
    poof.style.left = div.offsetLeft + "px";
    poof.style.top = div.offsetTop + "px";
    poof.style.width = offsetWidth + "px";
    poof.style.height = offsetHeight + "px";
    poof.style.pointerEvents = "none";
    poof.style.overflow = "visible";
    poof.style.zIndex = "1000";

    div.parentElement.append(poof);

    div.style.visibility = "hidden";

    const rows = 4, cols = 4;
    const partWidth = offsetWidth / cols;
    const partHeight = offsetHeight / rows;
    const parts = [];

    const center = { x: (cols - 1) / 2, y: (rows - 1) / 2 };

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const part = document.createElement("span");
        part.style.position = "absolute";
        part.style.width = partWidth + "px";
        part.style.height = partHeight + "px";
        part.style.background = window.getComputedStyle(div).backgroundColor;
        part.style.left = x * partWidth + "px";
        part.style.top = y * partHeight + "px";
        const normX = x - center.x;
        const normY = y - center.y;
        part.style.transform = `translate(${normX * 100}px, ${normY * 100}px) scale(0.001)`;
        part.style.opacity = 0;
        part.style.transformOrigin = "center";
        parts.push(part);
        poof.appendChild(part);
      }
    }

    const animations = parts.map(part =>
      part.animate([
        { transform: "translate(0, 0) scale(1)", opacity: 1 }
      ], {
        duration: 800,
        easing: "ease-in-out",
        fill: "forwards"
      })
    );

    Promise.all(animations.map(a => a.finished)).then(() => {
      div.style.visibility = "visible";
      poof.remove();
    });
  });
}
