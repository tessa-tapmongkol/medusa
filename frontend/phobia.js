document.getElementById("submitPhobia").addEventListener("click", function() {
    var phobia_type = document.getElementById("phobia_type").value;
    if(phobia_type === null) {
        return null;
    }
    phobia_type = phobia_type.toLowerCase();
    var node = document.createElement("p");
    var text = document.createTextNode(phobia_type);
    node.appendChild(text);
    document.getElementById("phobias").appendChild(node);
})
