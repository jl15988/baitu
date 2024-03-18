class UrlInfo {

    href: string = null;
    hostname: string = null;
    origin: string = null;
    port: string = null;
    pathname: string = null;
    hash: string = null;
    protocol: string = null;

    url: URL = null;
    location: Location = null

    getURLParameter(name) {
        const url = window.location.href;
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}
