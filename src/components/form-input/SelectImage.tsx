interface SelectImageModel {
    event: React.ChangeEvent<HTMLInputElement>,
    setCurrentImage: Function,
    setPreviewImage: Function
}

export const SelectImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    setCurrentImage: Function,
    setPreviewImage?: Function
) => {
    const selectedFiles = event.target.files as FileList;
    // props.setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    if (selectedFiles?.[0]) {
        setCurrentImage(selectedFiles?.[0]);
        setPreviewImage&&setPreviewImage(URL.createObjectURL(selectedFiles?.[0])) 
    }else{
        console.log('oops')
    }
}
