// State
let noCount = 0;
let isAccepted = false;

// No button phrases
const noPhrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

// Elements
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const noText = document.getElementById('noText');
const proposalCard = document.getElementById('proposalCard');
const acceptedCard = document.getElementById('acceptedCard');
const footer = document.getElementById('footer');

// Yes button handler
yesButton.addEventListener('click', () => {
    isAccepted = true;
    
    // Hide proposal card
    proposalCard.style.display = 'none';
    
    // Show accepted card
    acceptedCard.style.display = 'flex';
    
    // Hide footer
    footer.style.display = 'none';
    
    // Trigger confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ee2b4b', '#ffccd5', '#ffffff'],
    });
    
    // More confetti after a delay
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ee2b4b', '#ffccd5', '#ffffff'],
        });
    }, 300);
});

// No button move function
function moveNoButton() {
    if (isAccepted) return;
    
    // Get container bounds
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    // Calculate available space
    const maxX = (containerRect.width - buttonRect.width) / 2;
    const maxY = 40;
    
    // Generate random position within bounds
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    
    // Apply new position
    noButton.style.transform = `translate(${newX}px, ${newY}px)`;
    
    // Update text
    noText.textContent = noPhrases[Math.min(noCount, noPhrases.length - 1)];
    noCount++;
}

// No button hover handler (desktop)
noButton.addEventListener('mouseenter', moveNoButton);

// No button touch/click handler (mobile)
noButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Also handle click attempts on mobile
noButton.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Reset no button position when mouse leaves container
const buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('mouseleave', () => {
    // Don't reset immediately to avoid flickering
    setTimeout(() => {
        if (!buttonContainer.matches(':hover')) {
            noButton.style.transform = 'translate(0, 0)';
        }
    }, 100);
});