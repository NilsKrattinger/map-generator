const withNoise = {
    withNoise() {
        var bufferSize = 4096; //Math.pow(2,13); //between 8 & 14

        //make this a global var so it isnt garbage collected
        whiteNoise = context.createScriptProcessor(bufferSize, 0, 2);
        whiteNoise.onaudioprocess = function (e) {
            var outputBuffer = e.outputBuffer;
            for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
                var outputData = outputBuffer.getChannelData(channel);
                for (var i = 0; i < bufferSize; i++) {
                    outputData[i] = Math.random() * 2 - 1;
                }
            }
        }
    },
}