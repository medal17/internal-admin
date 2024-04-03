export function isValidEmailAddress(address:string) {
    // return !! address.match(/.+@.+.+/);
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(address)
}

export function isValidPassword(password:string){
    let regPass= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/;
    return regPass.test(password);
}

export function stringSentenceCase(str:string) {
    return str.replace(/\.\s+([a-z])[^\.]|^(\s*[a-z])[^\.]/g, s => s.replace(/([a-z])/,s => s.toUpperCase()))
  }

export function truncateText(str:string, digits:number, trilingDot?:boolean) {
    return str&&str?.length>digits+3 ? str.substring(0,digits)+(!trilingDot?'...':''):str;
}

export function backToTop(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
  }