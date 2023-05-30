let inflated = document.querySelector("inflated>textarea"),
    deflated = document.querySelector("deflated>textarea"),
    infCopy = document.querySelector("inflated .copy"),
    defCopy = document.querySelector("deflated .copy"),
    infDown = document.querySelector("inflated .download"),
    defDown = document.querySelector("deflated .download");

inflated.value = "";
deflated.value = "";

inflated.addEventListener("input",function() {
    if (inflated.value === "") {deflated.value = "";return;}
    let temp = pako.deflate(inflated.value, {level: 9});
    deflated.value = temp;//new TextDecoder().decode(temp);
});

deflated.addEventListener("input",function() {
    if (deflated.value === "") {inflated.value = "";return;}
    //let temp1 = new TextEncoder().encode(deflated.value);
    let temp2 = pako.inflate(JSON.parse("["+deflated.value+"]"));
    inflated.value = new TextDecoder().decode(temp2);
});

function download(content, fileName, contentType, who) {
    who.classList.add("success");
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    setTimeout(function() {
        who.classList.remove("success");
    }, 750);
}

function copy(content, who) {
    who.classList.remove("success","failure");
	content.select();
	navigator.clipboard.writeText(content.value).then(function() {
		who.classList.add("success");
	}, function() {
		who.classList.add("failure");
	});
    setTimeout(function() {
        who.classList.remove("success","failure");
    }, 750);
}

infCopy.addEventListener("click",function() {
    copy(inflated, infCopy);
});

defCopy.addEventListener("click",function() {
    copy(deflated, defCopy);
});

infDown.addEventListener("click",function() {
    download(inflated.value, "Decompressed.txt", "text/plain", infDown);
});

defDown.addEventListener("click",function() {
    download(deflated.value, "Compressed.txt", "text/plain", defDown);
});