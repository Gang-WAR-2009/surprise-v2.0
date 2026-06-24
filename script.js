const password = prompt("Enter Password to view the surprise: ");
        if (password !== "Kushagra1209") {
            alert("Wrong Password! Access Denied.");
            document.body.innerHTML = "<h1 style='text-align:center; margin-top:20vh; color:white;'>Access Denied 🔒</h1>";
            throw new Error("Incorrect Password");
        }

        function createFloatingHearts(container) {
            const hearts = ['💕', '💗', '💖', '💝', '💓'];
            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('div');
                heart.className = 'small-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 6 + 's';
                heart.style.animationDuration = (6 + Math.random() * 3) + 's';
                container.appendChild(heart);
            }
        }

        createFloatingHearts(document.getElementById('floatingHearts'));
        createFloatingHearts(document.getElementById('floatingHearts2'));

        function showSpeech(bearId, text, duration = 2500) {
            return new Promise(resolve => {
                const bubble = document.getElementById(`speech-${bearId}`);
                bubble.textContent = text;
                bubble.classList.add('show');
                setTimeout(() => {
                    bubble.classList.remove('show');
                    setTimeout(resolve, 300);
                }, duration);
            });
        }

        function moveBear(bearId, targetLeft, duration = 2000) {
            return new Promise(resolve => {
                const bear = document.getElementById(bearId);
                bear.classList.add('walking');
                const start = parseFloat(bear.style.left);
                const distance = targetLeft - start;
                const startTime = Date.now();

                function animate() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentLeft = start + (distance * progress);
                    bear.style.left = currentLeft + 'px';

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        bear.classList.remove('walking');
                        resolve();
                    }
                }
                animate();
            });
        }

        async function startAnimation() {
            await new Promise(r => setTimeout(r, 500));

            const centerX = window.innerWidth / 2;
            const isMobile = window.innerWidth < 768;
            const spacing = isMobile ? 110 : 150;

            await Promise.all([
                moveBear('ice-bear', centerX - spacing, 3000),
                moveBear('grizzly-bear', centerX, 3000),
                moveBear('panda-bear', centerX + spacing, 3000)
            ]);

            await showSpeech('ice', 'hey! i am ice☺️!', 2500);
            await new Promise(r => setTimeout(r, 300));
            await showSpeech('grizzly', 'And i am grizzly😄!', 2500);
            await new Promise(r => setTimeout(r, 300));
            await showSpeech('panda', 'Panda here😁!!', 2500);
            await new Promise(r => setTimeout(r, 500));

            const stackX = centerX;
            const iceBear = document.getElementById('ice-bear');
            const grizzlyBear = document.getElementById('grizzly-bear');
            const pandaBear = document.getElementById('panda-bear');

            iceBear.style.transition = 'all 0.8s ease';
            grizzlyBear.style.transition = 'all 0.8s ease';
            pandaBear.style.transition = 'all 0.8s ease';

            iceBear.style.left = stackX + 'px';
            iceBear.style.bottom = isMobile ? '30px' : '50px';

            await new Promise(r => setTimeout(r, 500));

            grizzlyBear.style.left = stackX + 'px';
            grizzlyBear.style.bottom = isMobile ? '110px' : '140px';

            await new Promise(r => setTimeout(r, 500));

            pandaBear.style.left = stackX + 'px';
            pandaBear.style.bottom = isMobile ? '190px' : '230px';

            await new Promise(r => setTimeout(r, 1000));

            document.getElementById('signboard').classList.add('show');
            await new Promise(r => setTimeout(r, 4000));

            grizzlyBear.classList.add('jumping');
            pandaBear.classList.add('jumping');

            await new Promise(r => setTimeout(r, 400));

            iceBear.style.left = (centerX - spacing) + 'px';
            iceBear.style.bottom = isMobile ? '30px' : '50px';
            grizzlyBear.style.left = centerX + 'px';
            grizzlyBear.style.bottom = isMobile ? '30px' : '50px';
            pandaBear.style.left = (centerX + spacing) + 'px';
            pandaBear.style.bottom = isMobile ? '30px' : '50px';

            await new Promise(r => setTimeout(r, 800));

            grizzlyBear.classList.remove('jumping');
            pandaBear.classList.remove('jumping');

            await new Promise(r => setTimeout(r, 500));

            await Promise.all([
                moveBear('ice-bear', window.innerWidth + 150, 3000),
                moveBear('grizzly-bear', window.innerWidth + 150, 3000),
                moveBear('panda-bear', window.innerWidth + 150, 3000)
            ]);

            document.getElementById('scene1').classList.add('fade-out');
            await new Promise(r => setTimeout(r, 800));
            document.getElementById('scene1').style.display = 'none';
            document.getElementById('scene2').style.display = 'block';

            await new Promise(r => setTimeout(r, 100));

            await Promise.all([
                moveBear('ice-bear-2', centerX - spacing, 3000),
                moveBear('grizzly-bear-2', centerX, 3000),
                moveBear('panda-bear-2', centerX + spacing, 3000)
            ]);

            await new Promise(r => setTimeout(r, 500));

            await showSpeech('ice-2', 'here\'s your surprise, turn the volume up🔊 & enjoy it!!🥰', 3000);

            await new Promise(r => setTimeout(r, 500));

            document.getElementById('giftGrid').parentElement.style.opacity = '1';
        }

        // Gift box file mapping (update with your actual file paths)
        const videoMap = {
            gift1: 'pitjayegaaaa.mp4',
            gift2: 'eyessss.mp4',
            gift3: 'ahemmm.mp4',
            gift4: 'monochrome1 (1).mp4',
            gift5: 'sorry😘🥲.mp4',
            gift6: 'traditional.mp4',
            gift7: 'camerashy.mp4',
            gift8: 'thefilter.mp4',
            gift9: 'thelastone.mp4'
        };

        // Add click listeners to all gift boxes
        Object.keys(videoMap).forEach(id => {
            document.getElementById(id).addEventListener('click', () => {
                const filePath = videoMap[id];
                const videoContainer = document.getElementById('videoContainer');
                const video = document.getElementById('surpriseVideo');
                const image = document.getElementById('surpriseImage');

                // Check if it's an image or video based on file extension
                const ext = filePath.split('.').pop().toLowerCase();
                const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
                const videoExts = ['mp4', 'webm', 'mov', 'm4v'];

                if (imageExts.includes(ext)) {
                    video.pause();
                    image.src = filePath;
                    image.style.display = 'block';
                    video.style.display = 'none';
                } else if (videoExts.includes(ext)) {
                    video.querySelector('source').src = filePath;
                    video.load();
                    video.style.display = 'block';
                    image.style.display = 'none';
                } else {
                    console.warn(`Unrecognized file type for ${id}: .${ext}`);
                    return;
                }

                videoContainer.classList.add('show');
                if (video.style.display === 'block') {
                    video.play();
                }
            });
        });

        function closeVideo() {
            const videoContainer = document.getElementById('videoContainer');
            const video = document.getElementById('surpriseVideo');
            video.pause();
            videoContainer.classList.remove('show');
        }

        window.addEventListener('load', startAnimation);
