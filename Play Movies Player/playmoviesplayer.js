/**
 * Play Movies Player
 * @author João Vitor - https://joaovitor.ml/
 */

(function () {

    "use strict";

    var totalplaymoviesplayer, idElement;

    // Criar um novo player de vídeo
    function playmoviesplayer(playmoviesplayerID) {

        // Elementos do player
        var videoTarget, playmoviesplayerElem, playmoviesplayerVideo, playmoviesplayerLegends, playmoviesplayerLoader, playmoviesplayerControls, volTarget, rangeVol, sliderVol, sliderDrag, rangeSeeker, progressBuffer, progressVideo, currentTimeTooltip, trackCaption, activeCaption, cuesTrack, cuesText, activityMouseFull, activityMouseTime, systemTime, isTouch, elementFullScreen, played;

        // Ações da barra de controles
        var playmoviesplayerBtnPlay, playmoviesplayerProgress, playmoviesplayerTotalTime, playmoviesplayerBtnVol, playmoviesplayerSliderVol, playmoviesplayerBtnCC, playmoviesplayerBtnScreen, playmoviesplayerBtnPlayCenter;

        // Contents
        var svgIcos, icoVol, playmoviesplayerContent;

        isTouch = ('ontouchstart' in document.documentElement === true);
        sliderDrag = false;
        cuesText = '';
        activeCaption = 'disabled';
        activityMouseFull = false;
        played = false;

        // Icones em SVG dos botões
        svgIcos = {
            play: '<svg viewBox="0 0 12 18"><path d="M13.6,8.1L1.9,0.2C1.1-0.3,0,0.2,0,1.1v15.7c0,0.9,1.1,1.5,1.9,0.9l11.7-7.9C14.1,9.4,14.1,8.6,13.6,8.1L13.6,8.1z"/></svg><span class="playmoviesplayer-tooltip">Iniciar</span>',
            pause: '<svg viewBox="0 0 18 18"><path d="M6 1H3c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zM12 1c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1h-3z"/></svg><span class="playmoviesplayer-tooltip">Pausar</span>',
            restart: '<svg viewBox="0 0 18 18"><path d="M9.7 1.2l.7 6.4 2.1-2.1c1.9 1.9 1.9 5.1 0 7-.9 1-2.2 1.5-3.5 1.5-1.3 0-2.6-.5-3.5-1.5-1.9-1.9-1.9-5.1 0-7 .6-.6 1.4-1.1 2.3-1.3l-.6-1.9C6 2.6 4.9 3.2 4 4.1 1.3 6.8 1.3 11.2 4 14c1.3 1.3 3.1 2 4.9 2 1.9 0 3.6-.7 4.9-2 2.7-2.7 2.7-7.1 0-9.9L16 1.9l-6.3-.7z"/></svg><span class="playmoviesplayer-tooltip">Reiniciar</span>',
            playc: '<svg viewBox="0 0 12 18"><path d="M13.6,8.1L1.9,0.2C1.1-0.3,0,0.2,0,1.1v15.7c0,0.9,1.1,1.5,1.9,0.9l11.7-7.9C14.1,9.4,14.1,8.6,13.6,8.1L13.6,8.1z"/></svg>',
            pausec: '<svg viewBox="0 0 18 18"><path d="M6 1H3c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zM12 1c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1h-3z"/></svg>',
            volhigh: '<svg viewBox="0 0 18 18"><path d="M15.6 3.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4C15.4 5.9 16 7.4 16 9c0 1.6-.6 3.1-1.8 4.3-.4.4-.4 1 0 1.4.2.2.5.3.7.3.3 0 .5-.1.7-.3C17.1 13.2 18 11.2 18 9s-.9-4.2-2.4-5.7z"></path><path d="M11.282 5.282a.909.909 0 0 0 0 1.316c.735.735.995 1.458.995 2.402 0 .936-.425 1.917-.995 2.487a.909.909 0 0 0 0 1.316c.145.145.636.262 1.018.156a.725.725 0 0 0 .298-.156C13.773 11.733 14.13 10.16 14.13 9c0-.17-.002-.34-.011-.51-.053-.992-.319-2.005-1.522-3.208a.909.909 0 0 0-1.316 0zM3.786 6.008H.714C.286 6.008 0 6.31 0 6.76v4.512c0 .452.286.752.714.752h3.072l4.071 3.858c.5.3 1.143 0 1.143-.602V2.752c0-.601-.643-.977-1.143-.601L3.786 6.008z"></path></svg><span class="playmoviesplayer-tooltip">Desativar</span>',
            vollow: '<svg viewBox="0 0 18 18"></path><path d="M11.282 5.282a.909.909 0 0 0 0 1.316c.735.735.995 1.458.995 2.402 0 .936-.425 1.917-.995 2.487a.909.909 0 0 0 0 1.316c.145.145.636.262 1.018.156a.725.725 0 0 0 .298-.156C13.773 11.733 14.13 10.16 14.13 9c0-.17-.002-.34-.011-.51-.053-.992-.319-2.005-1.522-3.208a.909.909 0 0 0-1.316 0zM3.786 6.008H.714C.286 6.008 0 6.31 0 6.76v4.512c0 .452.286.752.714.752h3.072l4.071 3.858c.5.3 1.143 0 1.143-.602V2.752c0-.601-.643-.977-1.143-.601L3.786 6.008z"></path></svg><span class="playmoviesplayer-tooltip">Desativar</span>',
            volmute: '<svg viewBox="0 0 18 18"><path d="M12.4 12.5l2.1-2.1 2.1 2.1 1.4-1.4L15.9 9 18 6.9l-1.4-1.4-2.1 2.1-2.1-2.1L11 6.9 13.1 9 11 11.1zM3.786 6.008H.714C.286 6.008 0 6.31 0 6.76v4.512c0 .452.286.752.714.752h3.072l4.071 3.858c.5.3 1.143 0 1.143-.602V2.752c0-.601-.643-.977-1.143-.601L3.786 6.008z"/></svg><span class="playmoviesplayer-tooltip">Ativar</span>',
            cc: '<svg viewBox="0 0 18 18"><path d="M1 1c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h4.6l2.7 2.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3l2.7-2.7H17c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1H1zm4.52 10.15c1.99 0 3.01-1.32 3.28-2.41l-1.29-.39c-.19.66-.78 1.45-1.99 1.45-1.14 0-2.2-.83-2.2-2.34 0-1.61 1.12-2.37 2.18-2.37 1.23 0 1.78.75 1.95 1.43l1.3-.41C8.47 4.96 7.46 3.76 5.5 3.76c-1.9 0-3.61 1.44-3.61 3.7 0 2.26 1.65 3.69 3.63 3.69zm7.57 0c1.99 0 3.01-1.32 3.28-2.41l-1.29-.39c-.19.66-.78 1.45-1.99 1.45-1.14 0-2.2-.83-2.2-2.34 0-1.61 1.12-2.37 2.18-2.37 1.23 0 1.78.75 1.95 1.43l1.3-.41c-.28-1.15-1.29-2.35-3.25-2.35-1.9 0-3.61 1.44-3.61 3.7 0 2.26 1.65 3.69 3.63 3.69z" fill-rule="evenodd"/></svg><span class="playmoviesplayer-tooltip">Legenda</span>',
            fullscreen: '<svg viewBox="0 0 18 18"><path d="M10 3h3.6l-4 4L11 8.4l4-4V8h2V1h-7zM7 9.6l-4 4V10H1v7h7v-2H4.4l4-4z"/></svg><span class="playmoviesplayer-tooltip">Tela Cheia</span>',
            restore: '<svg viewBox="0 0 18 18"><path d="M1 12h3.6l-4 4L2 17.4l4-4V17h2v-7H1zM16 .6l-4 4V1h-2v7h7V6h-3.6l4-4z"/></svg><span class="playmoviesplayer-tooltip">Restaurar</span>'
        };

        playmoviesplayerContent = '<div class="playmoviesplayer-loader"><div class="playmoviesplayer-loader-box"><div class="playmoviesplayer-gif"><div class="playmoviesplayer-spinner"><div class="playmoviesplayer-bounce1"></div><div class="playmoviesplayer-bounce2"></div><div class="playmoviesplayer-bounce3"></div></div></div></div></div><button type="button" class="playmoviesplayer-play-center"><svg viewBox="0 0 18 18"></svg></button><div class="playmoviesplayer-legends"><span></span></div><div class="playmoviesplayer-controls playmoviesplayer-controls-show"><button type="button" class="playmoviesplayer-play"><svg viewBox="0 0 18 18"></svg><span class="playmoviesplayer-tooltip">Iniciar</span></button><div class="playmoviesplayer-presentation"><input class="playmoviesplayer-rangeprog" type="range" min="0" max="100" step="0.1" value="0"><div class="playmoviesplayer-progress"><span class="playmoviesplayer-pbuffer"></span><span class="playmoviesplayer-pplayed"></span></div><span class="playmoviesplayer-tooltip">00:00</span></div><span class="playmoviesplayer-time">00:00</span><button type="button" class="playmoviesplayer-vol"><svg viewBox="0 0 18 18"></svg><span class="playmoviesplayer-tooltip">Desativar</span></button><div class="playmoviesplayer-volume"><input class="playmoviesplayer-rangevol" type="range" min="0" max="1" value="1" step="0.01"><div class="playmoviesplayer-progress"><span class="playmoviesplayer-setvolume" style="width: 100%;"></span></div></div><button type="button" class="playmoviesplayer-captions disabled"><svg viewBox="0 0 18 18"></svg><span class="playmoviesplayer-tooltip">Legenda</span></button><button type="button" class="playmoviesplayer-screen"><svg viewBox="0 0 18 18"></svg><span class="playmoviesplayer-tooltip">Tela Cheia</span></button></div>';

        // Cria os elementos do player
        function construct() {

            // Cria div container do player
            videoTarget = get(document, playmoviesplayerID);
            videoTarget.insertAdjacentHTML('afterend', '<div id="' + playmoviesplayerID + '"></div>');
            document.getElementById(playmoviesplayerID).remove();
            playmoviesplayerElem = get(document, playmoviesplayerID);
            videoTarget.removeAttribute('id');
            videoTarget.removeAttribute('class');
            playmoviesplayerElem.appendChild(videoTarget);
            playmoviesplayerElem.setAttribute('class', 'playmoviesplayer-video playmoviesplayer-cursor-show playmoviesplayer-fullscreen-off');
            playmoviesplayerElem.innerHTML += playmoviesplayerContent;

            /**
             * Elementos do player
             */

            // Elemento vídeo do player
            playmoviesplayerVideo = get(playmoviesplayerElem, 'video', 'tag');
            // Loader
            playmoviesplayerLoader = get(playmoviesplayerElem, 'playmoviesplayer-loader', 'class');

            // Play Center
            playmoviesplayerBtnPlayCenter = get(playmoviesplayerElem, 'playmoviesplayer-play-center', 'class');
            playmoviesplayerBtnPlayCenter.innerHTML = svgIcos.playc;

            // Lengenda
            playmoviesplayerLegends = get(playmoviesplayerElem, 'playmoviesplayer-legends', 'class');

            // Controls
            playmoviesplayerControls = get(playmoviesplayerElem, 'playmoviesplayer-controls', 'class');

            // Botão Play Pause e Restart
            playmoviesplayerBtnPlay = get(playmoviesplayerControls, 'playmoviesplayer-play', 'class');
            playmoviesplayerBtnPlay.innerHTML = svgIcos.play;

            // Progress
            playmoviesplayerProgress = get(playmoviesplayerControls, 'playmoviesplayer-presentation', 'class');

            // Range Seeker
            rangeSeeker = get(playmoviesplayerProgress, 'input', 'tag');

            // Buffer
            progressBuffer = get(playmoviesplayerProgress, 'playmoviesplayer-pbuffer', 'class');

            // Tooltip progress
            currentTimeTooltip = get(playmoviesplayerProgress, 'playmoviesplayer-tooltip', 'class');

            // Progress
            progressVideo = get(playmoviesplayerProgress, 'playmoviesplayer-pplayed', 'class');

            // Time total
            playmoviesplayerTotalTime = get(playmoviesplayerControls, 'playmoviesplayer-time', 'class');

            // Volume button
            playmoviesplayerBtnVol = get(playmoviesplayerControls, 'playmoviesplayer-vol', 'class');
            playmoviesplayerBtnVol.innerHTML = svgIcos.volhigh;
            icoVol = 'volhigh';

            // Volume Controls
            playmoviesplayerSliderVol = get(playmoviesplayerControls, 'playmoviesplayer-volume', 'class');

            // Range volume
            rangeVol = get(playmoviesplayerSliderVol, 'input', 'tag');

            // Slider Volume
            sliderVol = get(playmoviesplayerSliderVol, 'playmoviesplayer-setvolume', 'class');

            // Caption button
            playmoviesplayerBtnCC = get(playmoviesplayerControls, 'playmoviesplayer-captions', 'class');
            playmoviesplayerBtnCC.innerHTML = svgIcos.cc;
            handler(playmoviesplayerBtnCC, 'click', setTrack, !0);

            // Fullscreen button
            playmoviesplayerBtnScreen = get(playmoviesplayerControls, 'playmoviesplayer-screen', 'class');
            playmoviesplayerBtnScreen.innerHTML = svgIcos.fullscreen;

            // Eventos de seeker
            handler(playmoviesplayerProgress, 'mousedown', startDrag, !0);
            handler(playmoviesplayerSliderVol, 'mousedown', startDrag, !0);

            // eventos de audio
            handler(playmoviesplayerBtnVol, 'click', muteVideo, !0);
            handler(playmoviesplayerSliderVol, 'mousedown click mousewheel touchstart touchmove touchend', setVolume, !0);

            // Eventos de tela
            handler(playmoviesplayerBtnScreen, 'click', expandPlayer, !0);

            // Eventos do document
            handler(document, 'mouseup', startDrag, !0);
            handler(document, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', checkFullscren, !0);

            // Eventos do vídeo
            handler(playmoviesplayerVideo, 'canplay', canplay, !0);
            handler(playmoviesplayerVideo, 'timeupdate', updateTimer, !0);
            handler(playmoviesplayerVideo, 'waiting canplay playing play loadstart seeked', videoLoader, !0);
            handler(playmoviesplayerVideo, 'ended', restartVideo, !0);

            autoCorretor();

            // Dispara se ouver erro
            handler(playmoviesplayerVideo, 'error', videoError, !0);

            // Atividade do mouse
            handler(playmoviesplayerElem, 'mousemove', checkMouseActivity, !0);
            activityMouseFull = false;

            handler(playmoviesplayerVideo, 'progress', progressBuffering, !0);
        }

        // Verifica a atividade do mouse em fullscreen para esconder a barra de controles
        function checkMouseActivity(evt) {

            if (!activityMouseFull) {
                activityMouseFull = true;
                var e = playmoviesplayerElem.className;
                playmoviesplayerElem.className = e.replace("playmoviesplayer-cursor-hidden", "playmoviesplayer-cursor-show");
            }

            var d = new Date();
            activityMouseTime = d.getTime();
        }

        function progressBuffering() {

            var d = playmoviesplayerVideo.duration,
                c = playmoviesplayerVideo.currentTime,
                buffer = playmoviesplayerVideo.buffered,
                bufferW = 0;

            if (d > 0) {
                for (var i = 0; i < buffer.length; i++) {
                    if (buffer.start(buffer.length - 1 - i) < c) {
                        progressBuffer.style.width = (buffer.end(buffer.length - 1 - i) / d) * 100 + "%";
                        break;
                    }
                }
            }
        }

        // Atualiza o time, progress e o buffer do vídeo
        function updateTimer(evt) {

            //Duração total do video
            var h = Math.floor(playmoviesplayerVideo.currentTime / 3600),
                m = Math.floor(playmoviesplayerVideo.currentTime / 60),
                s = Math.floor(((playmoviesplayerVideo.currentTime / 60) % 1) * 60);

            // Usa o metodo convertTimer para setar a duração do vídeo
            playmoviesplayerTotalTime.textContent = convertTimer(h, m, s);


            var pctSeek = (playmoviesplayerVideo.currentTime / playmoviesplayerVideo.duration) * 100;

            if (!sliderDrag) {
                progressVideo.style.width = pctSeek + '%';
                rangeSeeker.value = pctSeek;
            }

            // Sistema de legenda
            if (trackCaption) {
                // Seta modo da legenda para 'hidden' quando for 'showing'
                if (trackCaption.mode == 'showing') {
                    trackCaption.mode = 'hidden';
                    activeCaption = 'hidden';
                }

                // Se a legenda estiver ativada chama metodo de controle de legenda
                if (trackCaption.mode != 'disabled') {
                    cuesControls();
                }

            }


            // Controle de atividade do mouse para esconder o menu
            var ms = new Date();
            if (activityMouseFull) {
                if (ms.getTime() > (activityMouseTime + 3000)) {
                    activityMouseFull = false;

                    var e = playmoviesplayerElem.className;
                    playmoviesplayerElem.className = e.replace("playmoviesplayer-cursor-show", "playmoviesplayer-cursor-hidden");
                }
            }
        }

        // Verifica o estado do Fullscreen para trocar do icone do botão e a class playmoviesplayer-video-fullscreen 
        function checkFullscren() {
            var df = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

            var c = playmoviesplayerElem.className;

            if (!df) {
                playmoviesplayerElem.className = c.replace('playmoviesplayer-fullscreen-on', 'playmoviesplayer-fullscreen-off');
                playmoviesplayerBtnScreen.innerHTML = svgIcos.fullscreen;
            } else {
                playmoviesplayerElem.className = c.replace('playmoviesplayer-fullscreen-off', 'playmoviesplayer-fullscreen-on');
                playmoviesplayerBtnScreen.innerHTML = svgIcos.restore;
            }
        }

        // Ação de reiniciar o vídeo quando acabar
        function restartVideo(evt) {
            playmoviesplayerBtnPlay.innerHTML = svgIcos.restart;
            var e = playmoviesplayerElem.className;
            playmoviesplayerElem.className = e.replace("playmoviesplayer-cursor-hidden", "playmoviesplayer-cursor-show");
            playmoviesplayerBtnPlayCenter.innerHTML = svgIcos.playc;
            playmoviesplayerBtnPlayCenter.style.display = 'block';
        }

        // Faz a correção dos elementos obrigatórios
        function autoCorretor() {
            playmoviesplayerElem.setAttribute('oncontextmenu', 'return false');
            playmoviesplayerVideo.controls = false;
            //playmoviesplayerVideo.setAttribute('crossorigin', '');

            /*
            if (!playmoviesplayerVideo.getAttribute('preload')) {
                playmoviesplayerVideo.preload = 'none';
            }*/

            // Remove botão de legenda se não encontrar nenhuma track...
            if (!playmoviesplayerElem.getElementsByTagName('track')[0]) {
                playmoviesplayerBtnCC.remove();
            }

            if (playmoviesplayerVideo.preload == 'none') {
                // Eventos de player e pause
                handler(playmoviesplayerBtnPlay, 'click', playVideo, !0);
                handler(playmoviesplayerBtnPlayCenter, 'click', playVideo, !0);
                handler(playmoviesplayerVideo, 'click', playVideo, !0);
                if (isTouch) {
                    handler(playmoviesplayerVideo, 'click', playVideo, !1);
                }
            }
        }

        // Converte o tempo e retorna no formato de hh:mm:ss
        function convertTimer(hours, minutes, seconds) {
            hours = (hours < 10 && hours > 0 ? '0' + hours + ":" : '');
            minutes = ((minutes < 10) ? '0' + minutes : minutes);
            minutes = ((minutes > 59) ? (minutes - (Math.floor(minutes / 60) * 60)) : minutes);
            seconds = ((seconds < 10) ? '0' + seconds : seconds);
            return String(hours) + String(minutes) + ':' + String(seconds);
        }

        // Chamado quando ouve erro no vídeo
        function videoError() {
            playmoviesplayerTotalTime.textContent = '00:00';
            currentTimeTooltip.textContent = '00:00';
        }

        // Libera o arrastar dos inputs range
        function startDrag(evt) {
            if (evt.type == "mousedown") {
                sliderDrag = true;
                if (String(evt.target.className) === 'playmoviesplayer-rangevol') {
                    handler(playmoviesplayerSliderVol, 'mousemove', setVolume, !0);
                }
            } else {
                sliderDrag = false;
                playmoviesplayerSliderVol.removeEventListener('mousemove', setVolume);
            }
        }

        // Controla o volume apartir do slider
        function setVolume(evt) {

            var value = rangeVol.value,
                clientX = 0,
                ClientRect = playmoviesplayerSliderVol.getBoundingClientRect(),
                position = 0,
                deltaWheel = Math.max(-1, Math.min(1, evt.wheelDelta));

            if (String(evt.type) !== 'touchend') {
                clientX = (String(evt.clientX) !== 'undefined' ? evt.clientX : evt.touches[0].clientX);
                clientX = (clientX - ClientRect.left) / rangeVol.clientWidth;
            }

            // Ações e eventos
            switch (evt.type) {

                case 'touchstart':
                    sliderVol.style.width = (clientX * 100) + '%';
                    break;

                case 'mousemove':
                    if (sliderDrag) {
                        updateVolume();
                    }
                    break;

                case 'mousewheel':
                    rangeVol.value -= (-0.1 * deltaWheel);
                    value = rangeVol.value;
                    updateVolume();

                    break;

                default:
                    updateVolume();
            }

            // Atualizar o sistema de volume
            function updateVolume() {
                if (playmoviesplayerVideo.muted) {
                    playmoviesplayerVideo.muted = false;
                }

                playmoviesplayerVideo.volume = value;
                sliderVol.style.width = (value * 100) + '%';

                volTarget = (playmoviesplayerVideo.volume > 0 ? playmoviesplayerVideo.volume : 1);
                if (playmoviesplayerVideo.volume > 0) {
                    if (playmoviesplayerVideo.volume >= 0.5) {
                        if (icoVol != 'volhigh') {
                            playmoviesplayerBtnVol.innerHTML = svgIcos.volhigh;
                            icoVol = 'volhigh';
                        }

                    } else {
                        if (icoVol != 'vollow') {
                            playmoviesplayerBtnVol.innerHTML = svgIcos.vollow;
                            icoVol = 'vollow';
                        }
                    }
                } else {
                    playmoviesplayerVideo.muted = true;
                    if (icoVol != 'volmute') {
                        playmoviesplayerBtnVol.innerHTML = svgIcos.volmute;
                        icoVol = 'volmute';
                    }
                }
            }
        }

        // Controla o seeker do vídeo apartir do slider
        function setSeeker(evt) {

            var clientX = (String(evt.clientX) !== 'undefined' ? evt.clientX : evt.touches[0].clientX);

            var ClientRect = playmoviesplayerProgress.getBoundingClientRect(),
                value = (clientX - ClientRect.left) / rangeSeeker.clientWidth,
                cH = Math.floor((value * playmoviesplayerVideo.duration) / 3600),
                cM = Math.floor((value * playmoviesplayerVideo.duration) / 60),
                cS = Math.floor((((value * playmoviesplayerVideo.duration) / 60) % 1) * 60);

            currentTimeTooltip.textContent = convertTimer(cH, cM, cS);
            currentTimeTooltip.style.left = (value * 100) + '%';

            switch (evt.type) {
                case 'mousemove':
                    if (sliderDrag) {
                        progressVideo.style.width = (value * 100) + '%';
                        updateSeeker();
                    }
                    break;
                case 'touchmove':
                    progressVideo.style.width = (value * 100) + '%';
                    updateSeeker();
                    break;
                default:
                    updateSeeker();
            }

            // Seta a nova posição do seeker
            function updateSeeker() {
                rangeSeeker.value = (value * 100);
                progressVideo.style.width = (value * 100) + '%';
                playmoviesplayerVideo.currentTime = (value * playmoviesplayerVideo.duration);
            }
        }

        // Controle do botão de volume
        function muteVideo() {
            if (!playmoviesplayerVideo.muted) {
                volTarget = (playmoviesplayerVideo.volume > 0 ? playmoviesplayerVideo.volume : 1);
                playmoviesplayerVideo.muted = true;
                playmoviesplayerVideo.volume = 0;
                playmoviesplayerBtnVol.innerHTML = svgIcos.volmute;
                icoVol = 'volmute';
                rangeVol.value = 0;
                sliderVol.style.width = 0;
            } else {
                playmoviesplayerVideo.muted = false;
                playmoviesplayerVideo.volume = volTarget;
                rangeVol.value = volTarget;
                sliderVol.style.width = (volTarget * 100) + '%';
                if (playmoviesplayerVideo.volume >= 0.5) {
                    playmoviesplayerBtnVol.innerHTML = svgIcos.volhigh;
                    icoVol = 'volhigh';
                } else {
                    playmoviesplayerBtnVol.innerHTML = svgIcos.vollow;
                    icoVol = 'vollow';
                }
            }
        }

        // Ações de play e pause do vídeo
        function playVideo(evt) {

            var e = String(evt.target.tagName);
            if (isTouch && e.toLowerCase() === 'video') {
                return false;
            }

            if (playmoviesplayerVideo.played.length != 0) {
                if (playmoviesplayerVideo.paused) {
                    played = true;
                    playmoviesplayerVideo.play();
                    playmoviesplayerBtnPlay.innerHTML = svgIcos.pause;
                    playmoviesplayerBtnPlayCenter.innerHTML = svgIcos.pausec;
                    if (!isTouch) {
                        playmoviesplayerBtnPlayCenter.style.display = 'none';
                    }
                } else {
                    played = false;
                    playmoviesplayerVideo.pause();
                    playmoviesplayerBtnPlay.innerHTML = svgIcos.play;
                    playmoviesplayerBtnPlayCenter.innerHTML = svgIcos.playc;
                    if (!isTouch) {
                        playmoviesplayerBtnPlayCenter.style.display = 'block';
                    }

                }
            } else {
                played = true;
                playmoviesplayerVideo.play();
                playmoviesplayerBtnPlay.innerHTML = svgIcos.pause;
                playmoviesplayerBtnPlayCenter.innerHTML = svgIcos.pausec;
                if (!isTouch) {
                    playmoviesplayerBtnPlayCenter.style.display = 'none';
                }
            }
        }

        // Chamado quando o vídeo pode ser reproduzido
        function canplay(evt) {

            played = true;

            //Duração total do video
            var h = Math.floor(playmoviesplayerVideo.duration / 3600),
                m = Math.floor(playmoviesplayerVideo.duration / 60),
                s = Math.floor(((playmoviesplayerVideo.duration / 60) % 1) * 60);

            // Usa o metodo convertTimer para setar a duração do vídeo
            playmoviesplayerTotalTime.textContent = convertTimer(h, m, s);

            // CurrentTime
            var cH = Math.floor(playmoviesplayerVideo.currentTime / 3600),
                cM = Math.floor(playmoviesplayerVideo.currentTime / 60),
                cS = Math.floor(((playmoviesplayerVideo.currentTime / 60) % 1) * 60);


            // Usa o metodo convertTimer para setar a o tempo de andamento do vídeo
            currentTimeTooltip.textContent = convertTimer(cH, cM, cS);

            // Eventos de seeker
            handler(playmoviesplayerProgress, 'mousedown mouseup mousemove touchstart touchmove', setSeeker, !0);

            // Faz a leitura do track da primeira legenda
            trackCaption = playmoviesplayerVideo.textTracks[0];

            // Verifica se existra track de legenda
            if (trackCaption) {
                trackCaption.mode = activeCaption;
            }


            // Eventos de player e pause
            handler(playmoviesplayerBtnPlay, 'click', playVideo, !0);
            handler(playmoviesplayerBtnPlayCenter, 'click', playVideo, !0);
            handler(playmoviesplayerVideo, 'click touchstart', playVideo, !0);

            // Remove evento click se existir touch
            if (isTouch) {
                handler(playmoviesplayerVideo, 'click', playVideo, !1);
            }

        }

        // e = Elemento - t = tipos de eventos separados por espaço - f = função chamada - c = capture - r = addEventListener ou removeEventListener
        function handler(e, t, f, r, c) {
            var s = t.split(" ");
            for (var i = 0; i < s.length; i++) {
                e[r ? "addEventListener" : "removeEventListener"](s[i], f, c);
            }
        }

        // getElementBy - e = elemento container - a = qual atributo - v = valor do atributo - i = indice
        function get(e, v, a, i) {
            i = !i ? 0 : i;
            switch (a) {
                case 'class':
                    return e["getElementsByClassName"](v)[i];
                    break;
                case 'tag':
                    return e["getElementsByTagName"](v)[i];
                    break;
                default:
                    return e["getElementById"](v);
            }
        }

        // Loader do player
        function videoLoader(evt) {
            if (played) {
                if (evt.type == 'waiting' || evt.type == 'loadstart') {
                    playmoviesplayerLoader.style.display = 'block';
                } else {
                    playmoviesplayerLoader.style.display = 'none';
                }
            }
        }

        // Sistema de fullscreen
        function expandPlayer() {

            var df, rf, ef;

            // fullscreenElement
            df = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

            // requestFullscreen
            rf = playmoviesplayerElem.requestFullscreen || playmoviesplayerElem.msRequestFullscreen || playmoviesplayerElem.mozRequestFullScreen || playmoviesplayerElem.webkitRequestFullscreen;

            //exitFullscreen
            ef = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;

            if (!df) {
                rf.call(playmoviesplayerElem);
            } else {
                ef.call(document);
            }
        }

        // Ativa e desativa a legenda
        function setTrack() {

            if (trackCaption) {
                if (trackCaption.mode == 'disabled') {
                    trackCaption.mode = 'hidden';
                    activeCaption = 'hidden';
                    playmoviesplayerBtnCC.className = 'playmoviesplayer-captions';
                } else {
                    trackCaption.mode = 'disabled';
                    activeCaption = 'disabled';
                    playmoviesplayerBtnCC.className = 'playmoviesplayer-captions disabled';
                    playmoviesplayerLegends.innerHTML = '<span></span>';
                }
            }
        }

        // Atualiza o texto da legenda quando disponivel
        function cuesControls() {

            cuesTrack = trackCaption.activeCues;

            if (cuesTrack) {
                if (cuesTrack.length > 0) {
                    if (cuesText !== cuesTrack[0].getCueAsHTML().textContent)
                        cuesText = cuesTrack[0].getCueAsHTML().textContent;
                    playmoviesplayerLegends.innerHTML = '<span>' + cuesText + '</span>';
                } else {
                    if (cuesText !== '') {
                        cuesText = '';
                        playmoviesplayerLegends.innerHTML = '<span></span>';
                    }
                }
            }
        }

        // Chama o metodo de construção
        construct();
    }

    totalplaymoviesplayer = document.getElementsByClassName('playmoviesplayer-video').length;
    if (totalplaymoviesplayer > 0) {

        for (var i = 0; i < totalplaymoviesplayer; i++) {
            idElement = 'playmoviesplayer-' + Math.floor(Math.random() * 100000000);
            document.getElementsByClassName('playmoviesplayer-video')[i].id = idElement;
            new playmoviesplayer(idElement);
        }

    }

})();