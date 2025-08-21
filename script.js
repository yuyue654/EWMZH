// 用于存储当前生成的二维码Canvas元素
let currentQRCodeCanvas = null;

function generateQRCode() {
    // 1. 获取用户输入
    const inputText = document.getElementById('qr-text').value.trim();

    // 2. 简单的验证：输入不能为空
    if (inputText === '') {
        alert('请输入内容后再生成二维码！');
        return;
    }

    // 3. 获取要展示二维码的DOM元素
    const qrCodeElement = document.getElementById('qrcode');

    // 4. 清空之前生成的二维码
    qrCodeElement.innerHTML = '';

    // 5. 使用QRCode.js库生成二维码
    try {
        // 确保我们有一个有效的容器元素
        if (!qrCodeElement || !(qrCodeElement instanceof Element)) {
            throw new Error("找不到二维码容器元素");
        }
        
        // 清空容器
        qrCodeElement.innerHTML = '';
        
        // 创建一个新的 canvas 元素
        const canvas = document.createElement('canvas');
        qrCodeElement.appendChild(canvas);
        
        // 使用新的 API 调用方式
        QRCode.toCanvas(canvas, inputText, {
            width: 200,
            height: 200,
            margin: 1,
            color: {
                dark: "#000000",
                light: "#FFFFFF"
            }
        }, function (error) {
            if (error) {
                console.error("QRCode 生成错误:", error);
                alert('生成二维码时出错，请重试。');
                qrCodeElement.innerHTML = ''; // 清除失败的尝试
                return;
            }
            currentQRCodeCanvas = canvas;
            document.getElementById('download-group').style.display = 'block';
        });
    } catch (err) {
        console.error("捕获到异常:", err);
        alert('发生错误: ' + err.message);
    }
}

function downloadQRCode() {
    if (!currentQRCodeCanvas) {
        alert('请先生成二维码！');
        return;
    }

    try {
        // 创建一个临时链接 (<a> 标签)
        const link = document.createElement('a');
        // 将Canvas的内容转换为一个图像URL
        link.href = currentQRCodeCanvas.toDataURL('image/png');
        // 设置下载的文件名
        link.download = 'My-QR-Code.png';
        // 模拟点击这个链接，触发浏览器下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error("下载错误:", err);
        alert('下载二维码时出错: ' + err.message);
    }
}