const clipContent = str => {
    if (str.length <= 120) {
        return str;
    }
    var res = "";
    for (var i = 0; i < str.length; i++) {
        if (i >= 120) {
            break;
        }
        res += str[i];
    }
    res += '...'
    return res;
}

export default clipContent