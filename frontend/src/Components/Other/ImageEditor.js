import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import AlertDialog from './AlertDialog';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const ImageEditor = (props) => {
    const [src, setSrc] = useState(props.src);
    const [imageData, setImageData] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 30,
        aspect: 1 / 1,
    });
    const [alert, setAlert] = useState(null);
    const [completeCrop, setComplateCrop] = useState(null);

    // useEffect((props1)=>{
    //     setSrc(props.src);
    // });

    const getCroppedImg = () => {
        const crop = completeCrop;
        const image = imageData;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');

        props.onComplete(base64Image);
        // this.setState({user_pic : base64Image, imageSrc : null, completeCrop : null});
    }

    return (
        <Dialog open onClose={() => { props.onClose()}}>
            <div>
                <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={(image) => {
                        if (image.width < 50 || image.height < 50) {
                            setAlert(
                                <AlertDialog
                                    severity="error"
                                    content={`사진 크기가 너무 작습니다. [넓이:${image.width}px : 50px] [높이:${image.height}px : 50px]`}
                                    onAlertClose={() => {
                                        setAlert(null);
                                        setSrc(null);
                                        props.onClose();
                                    }}
                                />
                            );
                            return false;
                        }
                        setImageData(image);
                    }}
                    onChange={(currCrop) => setCrop(currCrop)}
                    onComplete={(complateCrop) => setComplateCrop(complateCrop)}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button color="primary" onClick={getCroppedImg}>완료</Button>
                <Button color="secondary" onClick={() => {
                    // setImage(null)
                    props.onClose();
                }}>취소</Button>
            </div>
            {alert}
        </Dialog>
    )
}

export default ImageEditor;