function bool2int(val) {
    if (val == false) return 0; else return 1;
}

function oth2bool(val) {
    if (val == 0) return false; else return true;
}


export {bool2int, oth2bool}
