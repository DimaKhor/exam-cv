export function addRippleEffect(event) {
    const target = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = target.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;

    target.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
}