declare class UrlInfo {
    href: string;
    hostname: string;
    origin: string;
    port: string;
    pathname: string;
    hash: string;
    protocol: string;
    url: URL;
    location: Location;
    getURLParameter(name: any): string;
}
