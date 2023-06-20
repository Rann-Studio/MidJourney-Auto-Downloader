const delay = 1000 // in milisecond

var chats, selectedChat, isDownloadable, downloadLink;
var lastDownloadLink = "";
var downloadBtn = document.createElement('a');

async function downloadImage(imageSrc) {
    const response = await fetch(imageSrc);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = + new Date() + ".png";
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
}

setInterval(function() {
    chats = document.querySelector('[data-list-id="chat-messages"]').querySelectorAll('li');
    selectedChat = chats[chats.length - 1].querySelector('div');

    try {
        isDownloadable = selectedChat.querySelector('[id^="message-accessories-"]').querySelectorAll('[class^="container-"]')[1].querySelector('div').querySelector('[role="link"]').querySelector('div').querySelector('div').querySelector('div').innerText == "Web" ? true : false;
        if (isDownloadable) {
            downloadLink = selectedChat.querySelector('[id^="message-accessories-"]').querySelector('[class^="mediaAttachments"]').querySelector('div').querySelector('div').querySelector('div').querySelector('div').querySelector('div').querySelector('div').querySelector('img').src;
            if (downloadLink != lastDownloadLink) {
                console.log(downloadLink);
                downloadImage(downloadLink).then(() => {})
            }
            lastDownloadLink = downloadLink
        }
    } catch (err) {

    }
}, delay);