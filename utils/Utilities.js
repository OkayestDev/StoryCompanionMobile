import { RNS3 } from 'react-native-aws3';

const options = {
    keyPrefix: "",
    bucket: "story-companion",
    region: "us-east-1",
    accessKey: "",
    secretKey: "",
    successActionStatus: 201
};

export default class Utilities {
    /**
     * Given a file, return the URL the file is uploaded to.
     * this.state.image holds the - we store the URL the file is stored at however.
     * we prepend the image name with the story_id to ensure uniqueness.
    */
    uploadImageToS3 = async (tag, fileObject, storyId) => {
        let fileName = fileObject.uri.split('.');
        let fileExtension = fileName[fileName.length - 1];
        let now = new Date();
        fileName = storyId + '-' + tag + '-' + now.getTime() + '.' + fileExtension;
        let file = {
            uri: fileObject.uri,
            name: fileName,
            type: 'image/' + fileExtension,
        };
        return RNS3.put(file, options).then((res) => {
            let imageUrl = "https://s3.amazonaws.com/story-companion/" + fileName; 
            return imageUrl;
        });
    }
}
