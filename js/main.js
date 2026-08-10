(() => {
  const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  addEventListener('load',()=>setTimeout(()=>$('#loader')?.classList.add('done'),650));
  const nav=$('#nav');
  const navScroll=()=>nav.classList.toggle('scrolled',scrollY>30); navScroll(); addEventListener('scroll',navScroll,{passive:true});

  const menu=$('#mobileMenu'), openBtn=$('#menuBtn'), closeBtn=$('#closeMenu');
  const setMenu=open=>{menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));openBtn.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''};
  openBtn?.addEventListener('click',()=>setMenu(true)); closeBtn?.addEventListener('click',()=>setMenu(false)); $$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false))); addEventListener('keydown',e=>e.key==='Escape'&&setMenu(false));

  const reveal=$$('.reveal');
  if(reduce) reveal.forEach(e=>e.classList.add('in')); else if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -7%'});reveal.forEach(e=>io.observe(e))} else reveal.forEach(e=>e.classList.add('in'));
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:reduce?'auto':'smooth'})}}));

  const projects=[
    {title:'Essential — Beauty & Skincare E-Commerce',tag:'01 · E-Commerce · Live',video:'Essential.mp4',poster:'Essential.jpg',cat:['fullstack'],desc:'A production e-commerce platform with customer storefront, admin dashboard, Stripe and PayPal checkout, invoicing and analytics.',points:['Stripe & PayPal checkout','Analytics admin dashboard','Wishlist, cart & coupons','bcrypt · RBAC · prepared statements'],tech:['PHP','MySQL','Stripe API','PayPal API','JavaScript','AJAX'],url:'https://essential.site.je/'},
    {title:'Professional CMS',tag:'02 · Content Platform · Live',video:'Cms.mp4',poster:'Cms.jpg',cat:['fullstack','security'],desc:'A production-minded content management system with a self-hosted rich-text editor, post version control and an administrative audit trail.',points:['TinyMCE editor','Version control & restore','Media library','RBAC · CSRF · XSS prevention'],tech:['PHP','MySQL','JavaScript','AJAX','TinyMCE','Chart.js'],url:'https://contentmanage.site.je/'},
    {title:'Two-Factor Authentication',tag:'03 · Security-first',video:'User Authentication.mp4',poster:'User Authentication.jpg',cat:['security','fullstack'],desc:'A secure authentication lifecycle pairing login credentials with Email OTP verification so a leaked password alone is not enough to get in.',points:['Email OTP verification','bcrypt password hashing','Secure password reset','RBAC · validation · prepared statements'],tech:['PHP','MySQL','JavaScript','AJAX','PHPMailer'],url:'https://sentinels.site.je/'},
    {title:'Social Media Dashboard',tag:'04 · Dashboard · Multi-platform',video:'Admin Social.mp4',poster:'Admin Social.jpg',cat:['fullstack'],desc:'A centralized dashboard for content management, scheduling and analytics across social-media workflows.',points:['Multi-account management','Post scheduling & publishing','Analytics & insights','Responsive admin dashboard'],tech:['PHP','MySQL','JavaScript','AJAX','Bootstrap'],url:null},
    {title:'Task Management System',tag:'05 · Collaboration · Workflow',video:'Task Manager.mp4',poster:'Task Manager.jpg',cat:['fullstack'],desc:'A role-based collaboration platform for task assignment, deadlines, progress tracking, notifications and live AJAX updates.',points:['Role-based assignment','Deadline tracking','Email reminders','AJAX status updates'],tech:['PHP','MySQL','JavaScript','AJAX','Bootstrap','SMTP'],url:null},
    {title:'Secure File Management System',tag:'06 · File Security',video:'secure file.mp4',poster:'secure file.jpg',cat:['security','fullstack'],desc:'A file platform treating uploads as untrusted by default with server-side validation, randomized naming, protected storage and activity logging.',points:['Type & size validation','Randomized naming','Protected upload directory','Access authorization & logging'],tech:['PHP','MySQL','JavaScript','AJAX','Bootstrap'],url:'https://filemanagement.site.je/'},
   {
    title: 'Braw To Brew',
    tag: '07 · Front-End Build',
    video: null,
    image:'assets/images/Espresso.jpg',
    mediaType: 'image',
    cat: ['frontend'],
    desc: 'A responsive coffee-shop website with modern UI, fluid layouts and interactive sections.',
    points: [
        'Responsive layout',
        'Interactive sections',
        'Modern visual system'
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://brawtobrew.netlify.app/'
},
    {title:'Hush Studio',tag:'08 · Front-End Build',image:'assets/images/Fashion.jpg',video:null,cat:['frontend'],desc:'A modern fashion guide with responsive layouts and an interactive contemporary interface.',points:['Responsive layout','Editorial presentation','Interactive UI'],tech:['HTML','CSS','JavaScript'],url:null}
  ];

  const grid=$('#projectGrid'), pager=$('#pagination'); let filter='all', page=1; const perPage=3;
  const esc=s=>s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function videoMarkup(p){return `<div class="project-media"><span class="video-badge">${esc(p.tag)}</span><video class="project-video" preload="metadata" playsinline poster="assets/images/posters/${encodeURIComponent(p.poster)}"><source src="assets/videos/${encodeURIComponent(p.video)}" type="video/mp4"></video><div class="video-controls"><button class="v-play" data-action="play" aria-label="Play or pause video">▶</button><div class="progress-wrap"><span class="current">0:00</span><input class="seek" data-action="seek" type="range" min="0" max="100" value="0" aria-label="Video progress"><span class="duration">0:00</span></div><div class="control-right"><input class="volume" data-action="volume" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume"><select class="speed" data-action="speed" aria-label="Playback speed"><option>1×</option><option>1.25×</option><option>1.5×</option><option>2×</option></select><button class="full" data-action="fullscreen" aria-label="Fullscreen">⛶</button></div></div></div>`}
function card(p, i) {

    // Video project
    if (p.video) {
        return `
            <article class="project-card reveal in">
                <div class="project-media-wrap">
                    ${videoMarkup(p)}
                </div>

                <div class="project-info">
                    <span class="project-meta">${esc(p.tag)}</span>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.desc)}</p>

                    <div class="project-points">
                        ${p.points.map(x => `<span>${esc(x)}</span>`).join('')}
                    </div>

                    <div class="tech-row">
                        ${p.tech.map(x => `<span>${esc(x)}</span>`).join('')}
                    </div>

                    <div class="project-actions">
                        ${p.url ? `
                            <a class="primary"
                               href="${p.url}"
                               target="_blank"
                               rel="noopener">
                               View live project ↗
                            </a>
                        ` : ''}

                        <a href="#contact">Discuss project ↘</a>
                    </div>
                </div>
            </article>
        `;
    }

    // Image project
    if (p.image) {
        return `
            <article class="project-card reveal in">

                <div class="project-media-wrap">
                    <div class="project-media project-image">
                        <img
                            src="${p.image}"
                            alt="${esc(p.title)}"
                            loading="lazy"
                        >
                    </div>
                </div>

                <div class="project-info">
                    <span class="project-meta">${esc(p.tag)}</span>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.desc)}</p>

                    <div class="project-points">
                        ${p.points.map(x => `<span>${esc(x)}</span>`).join('')}
                    </div>

                    <div class="tech-row">
                        ${p.tech.map(x => `<span>${esc(x)}</span>`).join('')}
                    </div>

                    <div class="project-actions">
                        ${p.url ? `
                            <a class="primary"
                               href="${p.url}"
                               target="_blank"
                               rel="noopener">
                               Live demo ↗
                            </a>
                        ` : ''}

                        <a href="#contact">Discuss project ↘</a>
                    </div>
                </div>

            </article>
        `;
    }

    // Fallback
    return `
        <article class="project-static reveal in">
            <div class="static-visual">
                <span>${String(i + 1).padStart(2, '0')}</span>
            </div>

            <div class="static-info">
                <span class="project-meta">${esc(p.tag)}</span>
                <h3>${esc(p.title)}</h3>
                <p>${esc(p.desc)}</p>

                <div class="project-points">
                    ${p.points.map(x => `<span>${esc(x)}</span>`).join('')}
                </div>

                <div class="tech-row">
                    ${p.tech.map(x => `<span>${esc(x)}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
}
  function filtered(){return projects.filter(p=>filter==='all'||p.cat.includes(filter))}
  function render(){const list=filtered(), pages=Math.max(1,Math.ceil(list.length/perPage)); if(page>pages)page=pages; const slice=list.slice((page-1)*perPage,page*perPage); grid.innerHTML=slice.map((p,i)=>card(p,(page-1)*perPage+i)).join(''); pager.innerHTML=''; const prev=document.createElement('button');prev.className='page-btn';prev.textContent='←';prev.disabled=page===1;prev.onclick=()=>{page--;render();grid.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})};pager.append(prev);for(let n=1;n<=pages;n++){const b=document.createElement('button');b.className='page-btn'+(n===page?' active':'');b.textContent=n;b.onclick=()=>{page=n;render()};pager.append(b)}const status=document.createElement('span');status.className='page-status';status.textContent=`PAGE ${page} / ${pages}`;pager.append(status);const next=document.createElement('button');next.className='page-btn';next.textContent='→';next.disabled=page===pages;next.onclick=()=>{page++;render();grid.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})};pager.append(next); bindVideos();}
  $$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;page=1;render()}));
  function fmt(t){if(!isFinite(t))return'0:00';const m=Math.floor(t/60),s=Math.floor(t%60).toString().padStart(2,'0');return`${m}:${s}`}
  function bindVideos(){ $$('.project-video').forEach(v=>{const root=v.closest('.project-media');const play=$('[data-action="play"]',root),seek=$('[data-action="seek"]',root),vol=$('[data-action="volume"]',root),speed=$('[data-action="speed"]',root),full=$('[data-action="fullscreen"]',root),cur=$('.current',root),dur=$('.duration',root);const sync=()=>{seek.value=v.duration?(v.currentTime/v.duration)*100:0;cur.textContent=fmt(v.currentTime);dur.textContent=fmt(v.duration)};play.onclick=()=>v.paused?v.play():v.pause();v.addEventListener('play',()=>play.textContent='❚❚');v.addEventListener('pause',()=>play.textContent='▶');v.addEventListener('loadedmetadata',sync);v.addEventListener('timeupdate',sync);seek.oninput=()=>{if(v.duration)v.currentTime=(seek.value/100)*v.duration};vol.oninput=()=>v.volume=Number(vol.value);speed.onchange=()=>v.playbackRate=parseFloat(speed.value);full.onclick=()=>root.requestFullscreen?.();v.addEventListener('click',e=>{if(e.target===v)v.paused?v.play():v.pause()});if(!reduce&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)v.pause()}),{threshold:.15});io.observe(v)}})}
  render();

  // Editorial technology interactions: tap/keyboard on touch devices, hover on desktop.
  $$('[data-tech-group]').forEach(group=>{
    const head=group.querySelector('.tech-group-head');
    head?.setAttribute('role','button');
    head?.setAttribute('tabindex','0');
    const toggle=()=>group.classList.toggle('expanded');
    head?.addEventListener('click',toggle);
    head?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  });


  $$('.copy-email').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.email);const x=b.textContent;b.textContent='Email copied ✓';setTimeout(()=>b.textContent=x,1600)}catch{location.href=`mailto:${b.dataset.email}`}}));

  const cursor=$('#cursor');if(cursor&&!reduce&&matchMedia('(pointer:fine)').matches){let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const loop=()=>{x+=(tx-x)*.16;y+=(ty-y)*.16;cursor.style.left=x+'px';cursor.style.top=y+'px';requestAnimationFrame(loop)};loop();document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,.project-card'))cursor.classList.add('hover')});document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,.project-card'))cursor.classList.remove('hover')})}else cursor?.remove();

  const canvas=$('#heroCanvas');if(canvas&&window.THREE&&!reduce){try{const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.z=5;const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.4));const group=new THREE.Group();scene.add(group);const mat=new THREE.PointsMaterial({color:0xffffff,size:.018,transparent:true,opacity:.28});const pos=[];for(let i=0;i<650;i++){const a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1),r=1.45+(Math.random()-.5)*.12;pos.push(r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a))}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));group.add(new THREE.Points(geo,mat));group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.48,2),new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.055})));const resize=()=>{const r=canvas.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()};resize();addEventListener('resize',resize,{passive:true});let visible=true;new IntersectionObserver(es=>visible=es[0].isIntersecting).observe(canvas);document.addEventListener('visibilitychange',()=>visible=document.visibilityState==='visible');const loop=t=>{if(visible){group.rotation.y=t*.00012;group.rotation.x=Math.sin(t*.00018)*.12;renderer.render(scene,camera)}requestAnimationFrame(loop)};requestAnimationFrame(loop)}catch(e){canvas.style.display='none'}}
})();
