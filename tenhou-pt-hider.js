// ==UserScript==
// @name         天凤PT点数隐藏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在天凤网站隐藏自己的PT点数，显示为xxxx
// @author       gzchenben
// @match        https://tenhou.net/*
// @match        http://tenhou.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 定义PT点数的选择器
    const PT_SELECTOR = 'table[align="right"] tr td:nth-child(5)';

    // 主函数，用于隐藏PT点数
    function hidePt() {
        // 获取所有PT点数元素
        const ptElements = document.querySelectorAll(PT_SELECTOR);

        // 遍历所有找到的元素并替换内容为"xxxx"
        ptElements.forEach(element => {
            if (element.textContent.trim() !== 'xxxx') {
                element.textContent = 'xxxx';
                // 可选：添加样式使显示更自然
                element.style.minWidth = '40px'; // 保持宽度一致
                element.style.display = 'inline-block';
                element.style.textAlign = 'center';
            }
        });
    }

    // 初始执行
    hidePt();

    // 使用MutationObserver监听DOM变化，以防PT点数动态加载
    const observer = new MutationObserver(function (mutations) {
        hidePt();
    });

    // 开始观察整个文档的动态变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 可选：每隔一段时间检查一次，确保PT点数被隐藏
    setInterval(hidePt, 1000);
})();