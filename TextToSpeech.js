class TextToSpeech{
    constructor(_text, _divParent, _player, _readedDiv){
        this.text = _text
        this.readedText = document.getElementById(_readedDiv)

        this.player = _player
        this.player.lang = "fr-CA"
        this.player.text = this.text
        this.player.volume = 1
        this.player.rate = localStorage.getItem('speed') && parseInt(localStorage.getItem('speed')) > 0 ? parseInt(localStorage.getItem('speed')) : 1
        this.player.pitch = localStorage.getItem('pitch') && parseInt(localStorage.getItem('pitch')) > 0 ? parseInt(localStorage.getItem('pitch')) : 1

        this.parent = document.getElementById(_divParent)
        this.launch = null
        this.play = null
        this.pause = null
        this.resume = null
        this.cancel = null
    }

    buildPlayer(){
        const launcher = document.createElement('i')
        const pause = this.pause ? this.pause : this.buildPause()
        const children = this.parent.hasChildNodes ? this.parent.lastChild : null
        // pretty straightforward jusque là^^
        launcher.classList.add('fa-solid', 'fa-headphones')
        launcher.setAttribute('tabindex', '0')
        launcher.setAttribute('aria-label', 'Lancer la lecture')
        launcher.style.marginLeft = "1rem"
        launcher.title = "Lecture audio"
        launcher.style.cursor = "pointer"
        launcher.id = "launcher"
        this.launch = launcher;
        launcher.onclick = () =>{
            if(window.speechSynthesis.speaking){
                window.speechSynthesis.cancel() //on arrête
            }
            window.speechSynthesis.speak(this.player)
            this.reset(this.launcher) //puis on reset (oui, ça parait superflue mais non, il faut d'abord arrêter. Don't ask)
            this.parent.append(pause)
            launcher.remove()
        }

        if(this.parent.hasChildNodes){
            if(children.id !== "resumeAudioIntro" && children.id !== "play" && children.id !== "launcher" && children.id !== "pause"){
                this.parent.append(launcher)
            }else{
                children.remove()
                this.parent.append(launcher)
            }
        }else{
            this.parent.append(launcher)
        }
    }

    buildPause(){
        const pause = document.createElement('i')
        const play = this.buildPlay()
        pause.classList.add('fa-solid', 'fa-pause')
        pause.setAttribute('tabindex', '0')
        pause.setAttribute('aria-label', 'Pause')
        pause.style.marginLeft = "1rem"
        pause.title = "Pause audio"
        pause.style.cursor = "pointer"
        pause.id = "pause"

        pause.onclick = () =>{
            window.speechSynthesis.pause(this.player)
            pause.remove()
            this.parent.append(play)
        }
        
        this.pause = pause
        this.reset(this.pause)
        return pause
    }

    buildPlay(){
        const play = document.createElement('i')
        const pause = this.pause
        play.classList.add('fa-solid', 'fa-play')
        play.setAttribute('tabindex', "0")
        play.setAttribute('aria-label', 'Reprise de la lecture audio')
        play.title = "Reprise de la lecture audio"
        play.style.marginLeft = "1rem"
        play.style.cursor = "pointer"
        play.id = "play"

        play.onclick = () =>{
            window.speechSynthesis.resume(this.player)
            play.remove()
            this.parent.append(this.pause)
        }
        this.play = play
        return play
    }

    // fonction qu'on appelle plusieurs fois et qui remet la piste à zero
    reset(obj){
        const el = obj
        if(el){
            this.player.onend = (e) =>{
                el.remove()
                setTimeout(() => {
                    this.buildPlayer()
                }, 250);
            }  
        }  
    }
}