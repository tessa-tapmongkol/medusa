async function getLabels(filename){
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    //const bucketName = "qwerhacks_image_temp"
    //const [result] = await client.labelDetection(`gs://${bucketName}/${filename}`);
    const [result] = await client.labelDetection(filename);
    const labels = result.labelAnnotations;
    return labels
}

// label_list =  a list of labels that defines the image
// triggers_list = user input on what they want us to blur
let isTriggering = (label_list, triggers_list) => {
    // build a map because efficiency matters :)
    mapper = {}
    for (let i = 0; i < triggers_list.length; i++){
        mapper[triggers_list[i]] = 1
    }

    for (let i = 0; i < label_list.length; i++){
        if (mapper[label_list[i].toLowerCase()] != undefined) {
            // image is in trigger list. 
            // We need to blur it
            return true
        }
    }
    return false
}

// main function
async function needToBlur(filename, triggers_list){
    return new Promise((resolve, reject) => {
        try {
            getLabels(filename).then(labels => {
                let labels_parsed = []
                for (let i = 0; i < labels.length; i++){
                    labels_parsed.push(labels[i].description)
                }
                resolve(isTriggering(labels_parsed, triggers_list));
            })
        }
        catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    needToBlur
}