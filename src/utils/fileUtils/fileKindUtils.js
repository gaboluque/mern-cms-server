const VIDEO_FILE = 'video';
const IMAGE_FILE = 'image';
const PDF_FILE = 'pdf';

const kindList = [VIDEO_FILE, IMAGE_FILE, PDF_FILE];

const fileExtToKind = (ext) => {
  switch (ext) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      return IMAGE_FILE;
    case 'mp4':
    case 'avi':
    case 'mpeg':
      return VIDEO_FILE;
    case 'pdf':
      return PDF_FILE;
    default:
      return null;
  }
};

export { VIDEO_FILE, IMAGE_FILE, PDF_FILE, kindList, fileExtToKind };
