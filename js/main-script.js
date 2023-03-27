var actionButton = document.querySelectorAll('.action-button button')
var hiddenUpload = document.querySelector('.action-button .hidden-upload')
var image_workspaceSpan = document.querySelector('.image-workspace span')
var preview_containerSpan = document.querySelector('.preview-container span')
const resultImage = document.querySelector('.result-image');
var filter = document.querySelectorAll('.filter')
var container = document.querySelector('.container')


actionButton[0].onclick = () => hiddenUpload.click()
filter[0].setAttribute('style', 'display:none;')

function ChangeName(x){
    Options=["Heart","Square","Circle","Star","Default"]
    button=document.getElementById('filter-btn')
    button.innerText=Options[x]
}
hiddenUpload.onchange = () => {
    document.querySelector('.image-workspace').innerHTML = `<img src="" alt="">`
    var image_workspace = document.querySelector('.image-workspace img')
    container.setAttribute('style', 'height:auto;')
    var file = hiddenUpload.files[0]
    var url = window.URL.createObjectURL(new Blob([file], { type : 'image/jpg' }))
    image_workspace.src = url

    var options = {
        dragMode: 'move',
        preview: '.img-preview',
        viewMode: 2,
        modal: false,
        background: false,
        ready: function(){
            actionButton[1].onclick = () => {
                actionButton[1].innerText = '...'
                cropper.getCroppedCanvas().toBlob((blob) => {
                    var downloadUrl = window.URL.createObjectURL(blob)
                    resultImage.src = downloadUrl
                    resultImage.setAttribute('style', 'max-width: 100%; max-height: 100%;');
                    actionButton[1].innerText = 'Crop'
                    filter[0].setAttribute('style', 'display:block;')
                })
            }
            actionButton[2].onclick = () => {
                var option=actionButton[2].innerText;
                actionButton[2].innerText = '...'
                cropper.getCroppedCanvas().toBlob((blob) => {
                    var downloadUrl = window.URL.createObjectURL(blob)
                    var canvas=document.getElementById('canvas')
                    var ctx=canvas.getContext('2d');
                    resultImage.src=downloadUrl;
                    var image1 = new Image();
                    image1.src = document.getElementById("result-image").src
                    canvas.width = 1000
                    canvas.height = 1000
                    image1.onload = function() {
                      ctx.drawImage(image1, 
                        canvas.width / 2 - image1.width / 2,
                        0);
                        var image2 = new Image();
                        if(option=="Default"){
                            actionButton[1].click()
                            filter.style.margin='100px';
                            return 0;
                        }
                        image2.src = "/Assets/"+option+".png"                 
                        image2.onload = function() {
                        ctx.globalCompositeOperation = 'lighten';
                        ctx.drawImage(image2,
                            canvas.width / 2 - image1.width / 2,
                            0, image1.width, image1.height);
                        resultImage.src = canvas.toDataURL("image/png",1.0);

                      };
                    };

                })
                actionButton[2].innerText = 'Filter'
            }
            actionButton[4].onclick= () => {
                actionButton[4].innerText = '...'
                cropper.getCroppedCanvas().toBlob((blob) => {
                    var downloadUrl = document.getElementById('result-image').src
                    var a = document.createElement('a')
                    a.href = downloadUrl
                    a.download = 'cropped-image.jpg'
                    a.click()
                    actionButton[4].innerText = 'Download'
                })
            }
        }
    }

    var cropper = new Cropper(image_workspace, options)
}