const roles = [
  "Graphic Designer",
  "UI / UX Designer",
  "Web Developer"
];
const typingEl = document.getElementById('typing');
let rIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[rIndex % roles.length];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      setTimeout(() => deleting = true, 900);
    }
  } else {
    typingEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false; rIndex++; 
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();


document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.18});
revealEls.forEach(el => revealObserver.observe(el));

const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(card=>{

  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width/2;
    const cy = rect.height/2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const tiltX = (dy * 6).toFixed(2);
    const tiltY = (dx * -8).toFixed(2);
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
    card.style.boxShadow = `0 20px 40px rgba(2,8,23,0.6), 0 6px 20px rgba(7,215,181,0.06)`;
  });

  card.addEventListener('mouseleave', ()=>{
    card.style.transform = 'none';
    card.style.boxShadow = '0 8px 30px rgba(2,8,23,0.6)';
  });

  
  card.addEventListener('touchstart', ()=>{
    card.style.transform = 'scale(1.02) translateY(-6px)';
  });
  card.addEventListener('touchend', ()=>{
    card.style.transform = 'none';
  });
});


document.querySelectorAll('.ripple').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const circle = document.createElement('span');
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    circle.className = 'ripple-effect';
    this.appendChild(circle);
    setTimeout(()=> circle.remove(), 600);
  });
});


const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent('Portfolio enquiry from ' + data.get('name'));
    const body = encodeURIComponent(data.get('message') + '\n\n— ' + data.get('name') + ' (' + data.get('email') + ')');
    window.location.href = 'mailto:falanadominion22@gmail.com?subject=' + subject + '&body=' + body;
  });
}


const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
.ripple-effect{
  position:absolute;
  width:12px;height:12px;border-radius:50%;
  background:rgba(255,255,255,0.12);
  transform:translate(-50%,-50%) scale(1);
  animation: rippleGrow .6s ease-out forwards;
  pointer-events:none;
}
@keyframes rippleGrow{
  0%{ transform: translate(-50%,-50%) scale(.5); opacity:0.9 }
  100%{ transform: translate(-50%,-50%) scale(25); opacity:0 }
}
`;
document.head.appendChild(rippleStyle);