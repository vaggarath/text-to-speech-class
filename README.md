# text-to-speech-class
A small JS class to build text to speech module on the fly

 JS class for textToSpeech module

A small JS to create text to speech on website.
It allows to create a several tracks player. Also permits to propose several voices, (more interesting for multi lingual websites)
If volume is set in stone at 1, rate and speech are either at 1 or set by a value retrieved in the localStorage (speed & pitch values).

https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
https://developer.mozilla.org/fr/docs/Web/API/SpeechSynthesisUtterance

the class being made for a WP theme, there is a bit of configuration to add (to import voices and to have some option during reading (event listener on boundary)
